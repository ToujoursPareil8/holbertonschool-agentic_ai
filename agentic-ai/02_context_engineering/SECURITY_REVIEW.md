prompt :

Analyse et corrige la vulnérabilité SQL présente dans le fichier #file:src/legacy_auth.js 
applique les regles suivantes :
1. remplace la concaténation dynamique par des requetes préparées pour neutraliser toute tentative d'injection SQL
2. Ne modifie pas la sinature de la fonction d'authentification
3. ne modifie ni la signature de la fonction ni la strucutre de l'objet ou de la valeur retournée en cas de succes ou de failure pour préserver la compatibilité fonctionelle


Résumé des modifications proposées par l'Agent

    Remplacement de la requête brute : La construction de la requête par concaténation de chaînes a été supprimée.

    Utilisation de requêtes paramétrées : Les entrées utilisateur sont désormais transmises via des placeholders (? ou $1, $2 selon le driver SQL utilisé) dans un tableau de paramètres séparé.

    Maintien du contrat de fonction : La signature de la fonction et la structure de l'objet de retour (ex: { success: true, user: ... }) ont été conservées à l'identique.

test cmd `npm run test:security`
baseline :
```bash
=== Début de la suite de tests de sécurité (Tâche 2) ===

Test 1 : Connexion légitime...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = 'dev@entreprise.com' AND password = 'password123'
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = 'admin@entreprise.com' OR '1'='1' AND password = 'hack'
❌ FAILED: FAILLE CRITIQUE DÉTECTÉE : L'injection SQL a réussi ! Votre prompt IA n'a pas sécurisé la requête.

true !== false
```
after :

```bash
=== Début de la suite de tests de sécurité (Tâche 2) ===

Test 1 : Connexion légitime...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = $1 AND password = $2
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = $1 AND password = $2
-> OK

✅ PASSED: Le code a été correctement sécurisé par l'agent IA.
```