# MÉMOIRE PROJET : Sentinel (Dashboard GitHub Issues)

## Stack & Conventions
- Environnement : Node.js (ESM, `"type": "module"`)
- Frontend : HTML/CSS/JS natifs uniquement, aucun framework
- Token GitHub lu via `process.env.GITHUB_TOKEN` (dotenv), jamais commité

## Décisions Architecturales (Historique)
- L'API GitHub Issues renvoie aussi les Pull Requests : elles sont systématiquement filtrées (`!issue.pull_request`) pour ne garder que les vraies issues.
- **Règle Absolue :** avant toute génération de code de dashboard, l'agent doit d'abord interroger l'API et valider la structure des données réellement reçues — pas de dashboard écrit "à l'aveugle" sur une supposition de schéma.
- Gestion des pannes réseau : les erreurs HTTP et les échecs de `fetch` ne doivent jamais faire crasher le process ; retour d'un tableau vide + log d'erreur.

## État Actuel & Prochaine Étape
- Fait : script `index.js` de récupération des issues (`fetchRepoIssues`), lecture du token via `.env`.
- À faire : `dashboard/index.html`, `dashboard/app.js`, `dashboard/style.css` sont encore vides — le rendu visuel des issues n'a pas commencé.
- Point de vigilance : pas encore de gestion du rate-limiting GitHub (403 sur dépassement de quota) ni de pagination des issues.