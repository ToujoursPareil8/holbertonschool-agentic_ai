# Audit QA & Sécurité — Webhook de paiement

## Résumé

Le serveur Express implémente le contrat de `specifications.md` : validation de surface, réponse `200 OK` et trace console découplée. Le `Dockerfile` utilise une image Node versionnée, installe uniquement les dépendances de production et passe explicitement à l'utilisateur non-root `node`.

## Rapport d'audit

| Sévérité | Fichier:Ligne | Problème | Risque concret | Correctif recommandé |
|---|---|---|---|---|
| MOYENNE | [src/worker.js](src/worker.js#L69) | Le test ponctuel du chemin Langfuse HITL termine avec une assertion Windows après le résultat `false` | Un script court peut laisser des handles réseau du SDK ouverts et terminer anormalement | Tester via le worker long-lived ou exposer une fermeture explicite du client Langfuse pour les tests |
| FAIBLE | [Dockerfile](Dockerfile#L15) | Aucun `HEALTHCHECK` applicatif | Docker ne détecte pas automatiquement un app/worker dégradé | Ajouter un healthcheck adapté au déploiement |

## Vérifications explicites

### Docker

- Utilisateur non-root : **OK**, `USER node` est présent avant `CMD`.
- `.dockerignore` : **OK**, `node_modules`, `.git` et `.env` sont exclus.
- Secrets dans l'image : **OK**, aucun secret n'est défini dans le Dockerfile via `ENV` ou `ARG`.
- Image de base : **OK**, `node:22-alpine` est versionnée et légère.
- Dépendances : **OK**, `npm ci --omit=dev` est utilisé.
- Copie des sources : **OK**, `COPY --chown=node:node` est utilisé.
- Port : **OK**, `EXPOSE 3000` correspond au port par défaut.
- Compose : **OK**, `app`, `worker` et `redis` sont déclarés ; app et worker attendent le healthcheck Redis.
- Port Redis hôte : **OK**, aucun port Redis n'est publié vers l'hôte.
- Interaction worker : **OK**, `stdin_open: true` et `tty: true` permettent la confirmation HITL dans Docker.

### Robustesse JavaScript

- `tasks.json`, écritures concurrentes et boucle de planification : **N/A**, aucun stockage de tâches ni timer n'est prévu par la spécification.
- JSON invalide et payload trop volumineux : **OK**, réponses `400` et `413` vérifiées.
- Validation des données : **OK**, présence, types, longueur, statut, montant, devise et date sont contrôlés.
- Path traversal : **N/A**, aucun chemin utilisateur n'est construit.
- Erreurs HTTP : **OK**, les réponses ne divulguent ni stack trace ni chemin interne.
- Redis : **OK**, Redis est `healthy`, répond `PONG`, et le worker démarre sur `redis:6379`.
- Reconnexion Redis : **OK**, retry avec backoff présent dans [src/redis.js](src/redis.js#L18).
- En-tête `X-Powered-By` : **OK**, désactivé.
- Taille du body : **OK**, limite Express fixée à `100kb`.
- Audit npm : **OK**, `npm audit --audit-level=high` indique `0 vulnerabilities`.

### Langfuse et logique métier

- Trace de paiement : **OK**, une trace est créée par paiement avec `transactionId` et `eventId`.
- Décision HITL : **OK**, `n` retourne `false`, annule le remboursement et enregistre un score `0` ; `o` est traité comme approbation.
- Génération LLM : **À confirmer avec clé Gemini valide**, `observeOpenAI` et le nom `payment-transaction-analysis` sont présents ; aucun appel réel Gemini n'a été exécuté pendant cette QA.
- Flush Langfuse : **OK** sur le chemin de décision, avec réserve de fermeture CLI Windows décrite ci-dessus.
- Identifiant de trace : **RÉSERVE**, `payment-${paymentId}` est déterministe ; deux traitements du même paiement réutilisent donc la même trace.

## Écarts de conformité (`specifications.md`)

| Critère de la spec | Statut | Écart constaté |
|---|---|---|
| `POST /webhook/payment` | OK | Réponse valide vérifiée : `200` et `{"received":true}` |
| Payload conforme validé en surface | OK | Payload invalide vérifié : `400` |
| Réponse immédiate | OK | La réponse est envoyée avant l'enqueue asynchrone |
| Notification déposée dans Redis | OK | La longueur de file a augmenté après le webhook valide |
| Payload trop volumineux | À vérifier | Aucun test dédié exécuté dans cette campagne |
| Port `PORT`, défaut `3000` | OK | App démarrée sur le port Compose `3000` |
| Image Docker non privilégiée | OK | Image exécutée avec `uid=1000(node)` |
| Compose et healthcheck Redis | OK | Les trois services sont déclarés et le worker démarre après Redis |
| Analyse Gemini et trace Langfuse | RÉSERVE | Instrumentation présente ; appel Gemini réel non exécuté sans risquer un traitement externe |

## Tests exécutés

- `node --check` sur `src/worker.js`, `src/server.js` et `src/redis.js` : réussi.
- `npm audit --audit-level=high` : `0 vulnerabilities`.
- `docker compose config` : réussi.
- `docker build -t megashop-payment-webhook:qa .` : réussi.
- Image Docker : utilisateur effectif `node`, UID `1000`.
- Redis Compose : healthcheck sain et `PONG` depuis le réseau Docker.
- Worker Compose : connexion Redis réussie, démarrage puis arrêt `SIGTERM` propre.
- Webhook valide : `200 {"received":true}`.
- Webhook invalide : `400 {"error":"Invalid payment notification"}`.
- File Redis : notification valide visible dans `megashop:payment-notifications`.
- HITL Langfuse : refus `n` atteint le score et retourne `false`; assertion de fermeture du SDK observée dans le script CLI Windows.

## Verdict : GO avec réserves

Le périmètre webhook, Redis et Docker est validé ; la validation finale du worker LLM reste conditionnée à un appel Gemini réel et la fermeture du client Langfuse doit être durcie pour les exécutions ponctuelles.
