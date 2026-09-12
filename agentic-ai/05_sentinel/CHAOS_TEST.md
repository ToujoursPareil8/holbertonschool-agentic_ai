# Chaos Test : Gestion d'erreur HTTP (Sentinel)

## Objectif
Vérifier que le serveur MCP `fetch_github_issues` détecte une erreur HTTP renvoyée par l'API GitHub, ne crashe pas le processus Node.js, et transmet l'erreur formatée à l'Agent via `isError: true` — sans que celui-ci ne la traite comme une donnée valide.

## Sabotage effectué
- `GITHUB_TOKEN` remplacé par une valeur invalide/placeholder dans `05_sentinel/.env`
- Serveur MCP redémarré pour recharger la nouvelle valeur au démarrage

## Incident technique rencontré : framing stdio
Une première tentative avec un client stdio « brut » n'a produit aucune réponse décodée : le serveur démarrait correctement, mais le client ne respectait pas le framing des messages JSON-RPC attendu par le SDK MCP (encodage/format des messages sur stdin/stdout). Aucune erreur explicite, juste une absence de réponse exploitable.

**Correction** : passage au client officiel `StdioClientTransport` fourni par le SDK MCP pour exécuter le `callTool` en respectant le protocole. Le dialogue avec le serveur a immédiatement fonctionné.

## Prompt utilisé
> "Récupère les issues du repo `facebook/react` en utilisant explicitement ton outil MCP `fetch_github_issues`."

## Déroulé observé côté Agent

1. Reconnexion via `StdioClientTransport` et exécution du `callTool` : 

Ran `Set-Location 'c:\holberton\holbertonschool-agentic...'`

2. L'appel MCP atteint bien GitHub, mais le serveur renvoie une erreur 401. L'Agent vérifie la présence et le format général du secret **sans l'afficher en clair**, pour confirmer que le blocage vient bien de l'authentification :

Ran `$line = Get-Content 'c:\holberton\holbertonschool-...'`


## Réponse renvoyée par l'outil MCP (isError: true)
```json
{
  "content": [{ "type": "text", "text": "Erreur HTTP GitHub (401): Bad credentials" }],
  "isError": true
}
```

## Compte-rendu final de l'Agent
> L'outil MCP `fetch_github_issues` a bien été appelé pour `facebook/react`, mais GitHub a répondu :
> `Erreur HTTP GitHub (401): Bad credentials`
> Le `GITHUB_TOKEN` présent dans `05_sentinel/.env` semble être une valeur invalide ou un placeholder. Aucun résultat d'issue n'a donc pu être récupéré.

## Analyse

- **Pas de crash du process Node** : l'erreur HTTP a été interceptée dans le `try/catch` de l'outil, jamais propagée en exception fatale.
- **`isError: true` a rempli son rôle** : l'Agent n'a présenté le texte d'erreur à aucun moment comme une liste d'issues valide — il l'a explicitement reformulé comme un échec d'authentification, en langage naturel, avec la cause probable.
- **Réflexe de sécurité correct de l'Agent** : vérification de la présence/format du token sans jamais l'afficher en clair, conforme à la règle de non-exposition des secrets définie dans les instructions permanentes du projet.

## Test de contrôle (succès) — À COMPLÉTER
- [ ] `GITHUB_TOKEN` restauré avec la valeur valide dans `.env`
- [ ] Serveur MCP redémarré
- [ ] Même prompt relancé sur `facebook/react`
- [ ] Résultat obtenu : _(coller ici la liste des 5 issues renvoyées une fois le token valide)_

## Conclusion
Le serveur MCP gère correctement une panne d'authentification GitHub sans crasher, et transmet une erreur exploitable à l'Agent grâce à `isError: true`. Point d'attention identifié : la nécessité d'utiliser un client stdio conforme au SDK MCP (`StdioClientTransport`) plutôt qu'un client stdio artisanal, sous peine d'absence de réponse silencieuse et trompeuse.

## Test de contrôle (succès)
- [x] `GITHUB_TOKEN` restauré avec la valeur valide dans `.env`
- [x] Serveur MCP redémarré
- [x] Même prompt relancé sur `facebook/react`

## Réponse obtenue (token valide)

Issues retournées par fetch_github_issues (facebook/react) :

#37584 — Bug d'hydratation avec replay d'un host fiber — ouverte
https://github.com/react/react/issues/37584

#37578 — FragmentInstance.compareDocumentPosition(document) lève une TypeError — ouverte
https://github.com/react/react/issues/37578

#37577 — [DevTools] inspectHooks échoue avec use(browser()) — fermée
https://github.com/react/react/issues/37577


## Conclusion
Le sabotage puis la restauration du token confirment le comportement attendu : l'outil échoue proprement sur un 401 (test précédent) et renvoie des données exploitables une fois l'authentification valide. La chaîne complète — détection HTTP, `isError: true`, absence de crash — est validée dans les deux sens.

## Test de contrôle (succès)
- [x] `GITHUB_TOKEN` restauré avec la valeur valide dans `.env`
- [x] Serveur MCP redémarré
- [x] Même prompt relancé sur `facebook/react`
- [x] Sortie JSON brute vérifiée directement (pas via résumé de l'agent)

## Vérification de la sortie brute
- **Nombre d'issues renvoyées : 5** (conforme à `.slice(0, 5)`), correction du `per_page=10` → `per_page=100` validée : le filtrage des PR sur un dépôt aussi actif que facebook/react nécessitait une marge plus large.
- **URLs `react/react` au lieu de `facebook/react`** : vérifié — ce n'est pas un bug. Le dépôt `facebook/react` a été transféré vers l'organisation `react`; GitHub redirige la requête et renvoie les URLs canoniques à jour. Le comportement de l'outil est correct.

## Conclusion
Le sabotage puis la restauration du token confirment le comportement attendu : l'outil échoue proprement sur un 401 (isError: true, pas de crash), et renvoie des données complètes et exactes une fois l'authentification valide. La divergence d'URL initialement suspectée comme bug s'est révélée être un comportement normal de redirection GitHub après transfert de dépôt — vérifié plutôt que supposé.

## Enseignement sur le processus (à conserver)
La première itération de correction par l'agent a produit une régression puis un patch mal placé, sans montrer le diff — corrigés uniquement après relecture explicite du code par un humain. Rappel : un outil MCP est un livrable noté, la relecture ligne par ligne du code généré reste nécessaire même quand l'agent "annonce" que ça fonctionne.