# Spécifications produit — Lecteur Docker de `tasks.json`

## 1. Objectif

Fournir un petit service exécutable sous Docker qui surveille le fichier
`tasks.json` toutes les 5 secondes et affiche dans la sortie standard
(`stdout`) l'action de la première tâche dont le statut est exactement
`"pending"`.

Le service est un lecteur en lecture seule : il ne modifie pas le fichier et
ne change pas le statut des tâches.

## 2. Périmètre

### Inclus

- Lecture de `tasks.json` au démarrage puis toutes les 5 secondes.
- Recherche de la première tâche `pending`, en respectant l'ordre du tableau
  JSON.
- Affichage de sa propriété `action` dans la console.
- Exécution reproductible dans un conteneur Docker.
- Montage du fichier de tâches depuis l'hôte afin que ses mises à jour soient
  visibles par le conteneur.
- Gestion explicite des erreurs de fichier, de JSON et de schéma.
- Arrêt propre sur `SIGINT` et `SIGTERM`.

### Exclus

- Exécution de l'action affichée.
- Modification, suppression ou acquittement d'une tâche.
- Réordonnancement ou priorisation autre que l'ordre du tableau.
- API HTTP, interface graphique, base de données ou broker de messages.
- Déduplication des actions affichées entre deux lectures.

## 3. Contrat de données

`tasks.json` doit contenir un tableau JSON. Chaque élément doit être un objet
avec :

| Propriété | Type | Obligatoire | Règle |
| --- | --- | --- | --- |
| `id` | chaîne ou nombre | Non | Identifiant libre, conservé pour le diagnostic. |
| `action` | chaîne non vide | Oui | Valeur affichée lorsqu'une tâche est sélectionnée. |
| `status` | chaîne | Oui | Une tâche est sélectionnée si la valeur vaut exactement `pending`. |

Exemple :

```json
[
  { "id": 1, "action": "Synchroniser les utilisateurs", "status": "done" },
  { "id": 2, "action": "Envoyer le rapport quotidien", "status": "pending" },
  { "id": 3, "action": "Archiver les logs", "status": "pending" }
]
```

Dans cet exemple, le service doit afficher `Envoyer le rapport quotidien` à
chaque lecture.

## 4. Comportement fonctionnel

1. Le processus démarre et vérifie que `tasks.json` est lisible.
2. Il lit et parse le fichier immédiatement, sans attendre le premier
   intervalle de 5 secondes.
3. Il parcourt le tableau de gauche à droite.
4. Il sélectionne le premier objet dont `status === "pending"`.
5. Si une tâche est sélectionnée, il affiche uniquement sa valeur `action` sur
   une ligne de `stdout`.
6. S'il n'existe aucune tâche `pending`, il n'affiche aucune action et journalise
   un message d'information explicite, par exemple
   `No pending task found`.
7. Il attend 5 secondes entre deux lectures, puis recommence indéfiniment.
8. Chaque cycle relit le contenu du fichier afin de prendre en compte les
   modifications effectuées pendant l'exécution.

L'intervalle doit être centralisé dans une configuration ou une constante
exprimée en millisecondes (`5000`) et ne doit pas provoquer plusieurs cycles
concurrents si la lecture précédente échoue ou prend du temps.

## 5. Gestion des erreurs et observabilité

- Fichier absent ou non lisible : écrire un message d'erreur sur `stderr`,
  conserver le processus actif et réessayer au cycle suivant.
- JSON invalide : écrire un message d'erreur sur `stderr`, ignorer le cycle
  courant et réessayer après 5 secondes.
- Racine JSON qui n'est pas un tableau : traiter le cycle comme invalide et
  signaler l'erreur sur `stderr`.
- Tâche mal formée (absence de `action`, `action` vide ou `status` absent) :
  signaler l'entrée invalide sur `stderr`. Une entrée invalide ne doit pas être
  sélectionnée ; les autres entrées valides peuvent continuer à être
  parcourues.
- Une erreur ne doit jamais être transformée silencieusement en succès.
- Les logs de diagnostic doivent aller sur `stderr` afin de ne pas mélanger les
  actions consommables présentes sur `stdout`.
- À la réception de `SIGINT` ou `SIGTERM`, arrêter le timer, fermer les
  ressources ouvertes et quitter avec un code nul.

## 6. Exécution Docker

### Artefacts attendus

- `Dockerfile` minimal, basé sur une image runtime officielle et légère.
- Script de démarrage configuré comme `ENTRYPOINT` ou `CMD`.
- Utilisateur d'exécution non-root défini explicitement dans l'image (`USER`).
- `tasks.json` fourni par montage de volume, pas copié comme seule source de
  vérité dans l'image.
- `.dockerignore` excluant les dépendances locales, artefacts de build,
  fichiers Git et journaux.
- Documentation d'utilisation contenant les commandes de build et de lancement.

### Commandes de référence

```bash
docker build -t tasks-json-reader .
docker run --rm \
  -v "$(pwd)/tasks.json:/app/tasks.json:ro" \
  tasks-json-reader
```

Le conteneur doit rester au premier plan afin que ses sorties soient visibles
avec `docker logs`. Le fichier monté doit être accessible au chemin
`/app/tasks.json` (ou ce chemin doit être rendu configurable explicitement).
Le montage est en lecture seule pour garantir que le service ne puisse pas
modifier les données.

## 7. Exigences non fonctionnelles

- L'image ne doit contenir que les dépendances d'exécution nécessaires.
- Le processus doit s'exécuter avec un utilisateur non-root et ne doit pas
  nécessiter de privilèges Linux ou Docker particuliers.
- Le processus principal du conteneur doit recevoir les signaux Docker et
  retourner un code de sortie non nul uniquement pour une erreur fatale de
  démarrage explicitement définie.
- La consommation mémoire et CPU doit rester faible ; aucune boucle active
  (`busy loop`) n'est autorisée.
- Le comportement doit être déterministe pour un fichier donné.
- Le service ne doit pas dépendre du fuseau horaire local.

## 8. Tests d'acceptation

Les tests doivent couvrir au minimum :

1. sélection de la première tâche `pending` lorsque plusieurs tâches sont
   `pending` ;
2. absence de sortie d'action lorsqu'il n'y a aucune tâche `pending` ;
3. relecture du fichier après une modification ;
4. JSON invalide ;
5. fichier absent ou illisible ;
6. entrée qui n'est pas un tableau ;
7. tâche `pending` sans `action` valide ;
8. respect d'un intervalle de 5 secondes sans exécutions concurrentes ;
9. arrêt propre sur `SIGTERM` ;
10. démarrage du conteneur avec le volume `tasks.json` monté en lecture seule.

## 9. Critères de validation

La fonctionnalité est acceptée si :

- `docker build` réussit sans dépendance au contenu local de `node_modules` ou
  d'autres artefacts non nécessaires ;
- le conteneur démarre avec la commande documentée et reste actif ;
- l'inspection du conteneur confirme que le processus s'exécute avec un UID
  différent de `0` ;
- l'action de la première tâche `pending` apparaît sur `stdout` après le
  démarrage, puis après chaque cycle de 5 secondes ;
- une modification de `tasks.json` est prise en compte au cycle suivant ;
- les erreurs sont explicites sur `stderr` et n'arrêtent pas la surveillance
  lorsqu'un simple nouveau cycle peut récupérer la situation ;
- les tests d'acceptation passent et l'arrêt par signal ne laisse pas de
  processus enfant actif.
