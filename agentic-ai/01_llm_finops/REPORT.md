# Rapport d'Évaluation : Comparatif des Modèles

## Demande Technique Volontairement Floue

```
Écris un script pour scraper une page web et sauvegarder les données, en gérant les erreurs
```

## Modèles Évalués

- ChatGPT-5.6 Luna
- Claude Sonnet 5

## Résumé des Différences Observées

**ChatGPT-5.6 Luna :**
- Produit un script générique et léger (environ 70 lignes), sans commentaires.
- S'appuie sur seulement deux fonctions (scraper et sauvegarder), sans point d'entrée `main()` explicite.
- Suppose de manière rigide une structure spécifique du site à scraper.
- Ne gère aucune retentative réseau : une seule requête échouée entraîne un abandon immédiat.

**Claude Sonnet 5 :**
- Produit une solution plus dense et structurée (environ 193 lignes), abondamment commentée.
- Adopte une approche modulaire avec création d'exceptions personnalisées, une séparation stricte des responsabilités (fetch, parse, save, orchestrate) et une fonction `main()`.
- Intègre un mécanisme de résilience réseau avec jusqu'à 3 retentatives en backoff exponentiel.

## Problèmes et Choix Arbitraires Identifiés

1. **Langage de programmation non spécifié** : Les modèles choisissent arbitrairement le langage et l'écosystème de bibliothèques sans demande explicite du besoin.
2. **Absence de cas d'usage cible** : Sans cible définie, les modèles doivent inventer la structure HTML du site cible, ce qui rend le script inutilisable en l'état sans adaptation préalable.