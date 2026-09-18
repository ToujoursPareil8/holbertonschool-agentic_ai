# Audit QA & Sécurité — Webhook de paiement

## Résumé

Le serveur Express implémente le contrat de `specifications.md` : validation de surface, réponse `200 OK` et trace console découplée. Le `Dockerfile` utilise une image Node versionnée, installe uniquement les dépendances de production et passe explicitement à l'utilisateur non-root `node`.

## Rapport d'audit

| Sévérité | Fichier:Ligne | Problème | Risque concret | Correctif recommandé |
|---|---|---|---|---|
| - | [src/server.js](src/server.js#L1) | Aucun écart critique, élevé ou moyen constaté | Le comportement vérifié est conforme au contrat et les erreurs client sont traitées | Aucun correctif obligatoire |
| FAIBLE | [Dockerfile](Dockerfile#L15) | Aucun `HEALTHCHECK` | Une orchestration ne détecte pas automatiquement un processus dégradé | Ajouter un `HEALTHCHECK` si le déploiement l'exige |

## Vérifications explicites

### Docker

- Utilisateur non-root : **OK**, `USER node` est placé avant `CMD`.
- `.dockerignore` : **OK**, exclut `node_modules`, `.git` et `.env`.
- Secrets dans l'image : **OK**, aucun secret dans `Dockerfile`, `ENV` ou `ARG`.
- Image de base : **OK**, `node:20-alpine` est versionnée et légère.
- Dépendances : **OK**, `npm ci --omit=dev` est utilisé avec `package-lock.json`.
- Copie des sources : **OK**, les sources sont copiées avec `--chown=node:node`.
- Port : **OK**, `EXPOSE 3000` correspond à la valeur par défaut de `PORT`.

### Robustesse JavaScript

- Fichier `tasks.json` et planification : **N/A**, aucun stockage de tâches ni timer n'est prévu par la spécification.
- JSON invalide ou trop volumineux : **OK**, réponses `400` et `413` génériques.
- Validation des données : **OK**, type, présence, longueur, statut, montant, devise et date sont contrôlés.
- Path traversal : **N/A**, aucun chemin utilisateur n'est construit.
- Exceptions et erreurs Express : **OK**, middleware d'erreur générique et journalisation des erreurs de trace.
- En-tête `X-Powered-By` : **OK**, désactivé.
- Audit des dépendances : **OK**, `npm install` a trouvé `0 vulnerabilities`.

### Conformité fonctionnelle

| Critère de `specifications.md` | Statut | Écart constaté |
|---|---|---|
| `POST /webhook/payment` | OK | Aucun |
| Payload JSON conforme validé en surface | OK | Aucun |
| Réponse immédiate `200 OK` | OK | La réponse est envoyée avant la trace asynchrone |
| Trace dans la console | OK | Écriture via `setImmediate` après la réponse |
| Erreurs `400` et `413` sans détails internes | OK | Aucun |
| Port `PORT`, défaut `3000` | OK | Aucun |
| Exécution Docker non-root | OK | `USER node` présent avant `CMD` |

## Tests exécutés

- `npm install` : réussi, audit npm à `0 vulnerabilities`.
- Payload valide : `200`, `{ "received": true }`.
- JSON invalide : `400`.
- Objet vide : `400`.

## Verdict : GO avec réserves

GO pour le périmètre spécifié ; l'ajout d'un `HEALTHCHECK` reste recommandé mais n'est pas un critère fonctionnel bloquant.