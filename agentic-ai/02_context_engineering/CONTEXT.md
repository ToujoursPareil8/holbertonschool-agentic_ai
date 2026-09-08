# Context - Génération du service d'exportation de données

## 1. Prompt utilisé

```text
En te basant sur l'architecture et les conventions existantes dans #file:src`/repositories/user.repository.js et #file:src/services/user.service.js :
1. reproduis exactement le pattern d'accès au repository utilisé dans src/services/user.service.js
2. Applique la stratégie de gestion des exceptions 
3. Conserve la même structure de validation des données.

génère l'intégralité du fichier `src/services/export.services.js`
```

## 2. Fichiers fournis à Copilot comme contexte

`#file:src/repositories/user.repository.js`

`#file:src/services/user.service.js`

3. Nom et chemin du service généré

    Nom du fichier : export.service.js

    Chemin d'accès : src/services/export.service.js

4. Résumé des éléments de l'architecture existante repris par l'IA

    Injection / Accès au Repository : Instanciation de la classe UserRepository dans la classe du service (ou via injection par constructeur) et appel de ses méthodes asynchrones d'accès aux données.

    Gestion des exceptions : Reprise des blocs try/catch avec interception des erreurs de repository et réémission (re-throw) via les classes d'erreurs personnalisées du projet (ex. NotFoundError, ServiceError).

    Standard de code & Documentation : Conservation du style asynchrone (async/await), du nommage en camelCase, et de la structure de commentaires d'en-tête JSDoc (@param, @returns, @throws).