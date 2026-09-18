# Spécifications fonctionnelles — Webhook de paiement

## 1. Objectif

Le service reçoit les notifications de paiement émises par la banque. Il valide le format JSON en surface, dépose la notification dans une file Redis, puis accuse réception rapidement. L'analyse IA est réalisée par un worker séparé et ne bloque jamais le webhook.

## 1.1 Architecture cible

- `app` : serveur Express, validation du webhook et dépôt dans Redis.
- `worker` : consommation séquentielle de Redis et analyse IA via l'API OpenAI-compatible de Gemini.
- `redis` : file d'attente/cache interne, sans port exposé à l'hôte.
- Chaque appel LLM est instrumenté avec `observeOpenAI` et porte le nom de génération `payment-transaction-analysis`, ainsi que l'identifiant de transaction dans ses métadonnées.
- Les erreurs asynchrones de connexion Redis et les échecs de traitement sont journalisés sans exception non gérée.

## 2. Contrat HTTP

- **Méthode** : `POST`
- **Endpoint** : `/webhook/payment`
- **En-tête requis** : `Content-Type: application/json`
- **Taille maximale du corps** : 100 Ko
- **Réponse de succès** : `200 OK` avec le corps JSON `{ "received": true }`

Le corps doit être un objet JSON non vide contenant les champs suivants :

| Champ | Type | Contraintes |
|---|---|---|
| `eventId` | chaîne | non vide, 1 à 128 caractères |
| `paymentId` | chaîne | non vide, 1 à 128 caractères |
| `status` | chaîne | `paid`, `failed` ou `refunded` |
| `amount` | nombre | supérieur ou égal à 0 et fini |
| `currency` | chaîne | code ISO simplifié à 3 lettres majuscules |
| `occurredAt` | chaîne | date/heure ISO 8601 valide |

## 3. Règle d'accusé de réception

Après validation de la syntaxe JSON et de la structure de surface, le service envoie `200 OK` sans attendre un traitement métier en aval. La trace de réception est écrite dans la console de manière asynchrone après l'envoi de la réponse.

Une notification valide n'est pas refusée parce qu'un traitement aval ou une journalisation ultérieure rencontre une erreur.

## 4. Erreurs attendues

- JSON invalide, corps absent, tableau JSON ou objet vide : `400 Bad Request`.
- Champ manquant, type incorrect ou valeur hors contrainte : `400 Bad Request`.
- Corps dépassant 100 Ko : `413 Payload Too Large`.
- Les réponses d'erreur ne divulguent ni stack trace ni chemin interne.

## 5. Critères d'acceptation

1. Un paiement conforme à la structure ci-dessus sur `POST /webhook/payment` reçoit `200 OK` et `{ "received": true }`.
2. La notification reçue est déposée dans Redis et visible dans la console sans bloquer l'accusé de réception.
3. Un JSON invalide ou un payload non conforme reçoit `400`.
4. Un payload trop volumineux reçoit `413`.
5. Le serveur écoute sur le port configuré par `PORT`, avec `3000` comme valeur par défaut.
6. L'image Docker exécute le processus avec un utilisateur non privilégié.
7. `docker-compose.yml` démarre `app`, `worker` et `redis`, avec attente du healthcheck Redis pour les deux services applicatifs.
8. Le worker analyse chaque transaction avec Gemini et trace chaque génération dans Langfuse.