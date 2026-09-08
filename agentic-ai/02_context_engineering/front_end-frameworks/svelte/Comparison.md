## Comparaison Globale

**Similarités remarquées :** les trois frameworks ont une architecture orientée composants permettant de créer des interfaces modulaires et réutilisables.

**Différences d'implémentation :** React gère tout en JS avec la syntaxe JSX, Vue sépare logique et interface via des fichiers `.vue` divisés en `<script>` et `<template>`. Svelte compile le code pour supprimer l'overhead du framework = fichiers .svelte épurés.

**Concepts universels :** les notions de composant, de props, de state local, lifecycle et de rendu conditionnel dynamique.


## Composants Svelte 

**Création :** un composant Svelte est créé dans un fichier avec extension .svelte. I l contient des balises `<script>` pour la logique et HTML pour le template

**Organisation :** Les fichiers Svelte utilisent la convention SvelteKit/Vite avec un dossier `<src/lib>`, sous lequel on retrouve des sous-dossiers comme `components/` et `sections/`.

**Comparaison :** Contrairement à React qui demande de déclarer une fonction retournant du JSX, Svelte se rapproche des des SFC (Single File Components) de Vue.js avec moins de boilerplate.

**Ressenti :** L'approche de Svelte des Runes rend la déclarations des compsants plus simple, claire et directe.


## Templates et Syntaxe

**Fonctionnement de Svelte :** Svelte utilise du HTML classique + des blocs logiques spécifiques (ex : `{#if}` ou `{each}`)

**Comparaison avec JSX et Vue :**
-JSX mélange JS et HTML.
-Vue utilises des directives HTML imbriquées (ex: `v-if`,`v-for`).
-Svelte se situe entre les deux : pas de directives HTML comme Vue mais une syntaxe de blocs de template délimitée.

**Avantages et limites :** La lisibilité est un grand avantage des templates de Svelte, car ils ressemblent à du HTML natif. La limite est qu'il faut apprendre la syntaxe spécifique des blocs par rapport au JS de JSX.


## Props et flux de données

**Gestion dans Svelte :** Avec Svelte les props sont récupérés en utilisant la Rune `$props()` via la déstructuration : `let { title, description, icon } = $props();`.

**Comparaison :**
-En React les props sont passés en arguments de la fonction du composant : `const FeatureCard = {{ title, description}} => { ... }`.
-En Vue.js elles sont définies dans le `<script setup>` vie `defineProps ({ title: { type : String } })`.

**Similitudes :** Le flux de données reste unidirictionnel (*top-down*, du parent au child) et tout changement des props déclenche une mise à jour de l'interface.


## Etat et réactivité

**Gestion dans Svelte :** le state réactif est déclaré simplement avec la Rune `$state()` par exemple : `let isLoading = $state(true);`.

**Comparaison :**
-React utilise le hook `useState` qui retourne la valeur et une fonction de mutation (ex: `setLoading`).
-Vue utilise les vareiables `ref`ou `reactive`, nécessitant souvent d'accéder à `.value` dans le script.

**Quantité de code :** Svelte est le plus concis. On mute l'état directement (`isLoading = false`) sans fonctions de maj (React) ni suffixe `.value` (vue).

**Leçon sur la réactivité :** Cela démontre que la réactivité  peut être gérée au moment de la compilation (Svelte) plutôt qu'à l'exécution vie un Virtual DOM ou des Proxy.


## Logique de render

**Rendu conditionnel :** Svelte utilise `{#if error} ... {/if}`. React utilise les opérateurs logiques `{error && ...}`. Vue utilise la directive `<p v-if="error">`.

**Rendu dynaique (listes) :** Svelte utilise `{#each features as feature (feature.id)}`. React demande d'écrire `features.map((faeture) => ...)` avec une `key`. Vue utilse `v-for="feature in features" :key="feature.id"`.

**Comparaison :** les blocs `{#if}` et `{#each}` de Svelte séparent visuellement la logique conditionnelle du balisage, offrant un compromis lisible entre les ternaires denses de React et les attributs directifs de Vue.


## Lifecycle et side effects

**gestion dans Svelte :** La fonction `onMount` est utilisée pour  exécuter du code une fois le composant inséré dans le DOM.

**Compraison :** Cela équivaut au `useEffect (..., [])` de React et au `onMounted` de VUe.

**Similitudes :** Malgré des syntaxes différentes, le besoin de déclencher des opérations asynchrones de manières sécurisée lors de l'initialisation duu composant reste identique d'un framework à l'autre.


## Formulaires et events

**Inputs Svelte :** le *two-way binding* est natif avec `bind:value={formData.name}`.

**Evénements Svelte :** On utilise `onSubmit={handleSubmit}`.

**Comparaison :**
-React impose des composants contrôlés coûteux en syntaxe (`value={...}` + `onChange={(e) => ...}`)et nécessite l'usage manuel de `e.preventDefault()`
-Vue propose `v-model` pour le binding et `@submit.prevent` pour les events.
-Svelte et Vue réduisent considérablement le boilerplate des form par rapport à React.


## Oganisation du projet

**Structure Svelte :** le projet Svelte tire parti du dossier src/lib/ pour centraliser mes composants, les données et sections.

**Similitudes :** l'arborescence logique globale reste la même que les version React et Vue.

**Conventions Svelte :** les imports relatifs compliqués sont souvent remplacés par l'alias natif `$lib/`.


## Migration assistée par IA

**Outils utilisés :** Copilot (claude + gemini).

**Aide des versions précédentes :** Avoir des implémentations React et Vue fonctionnelles, ainsi que le fichier structuré `Comparison.md`, a aidé à fournir un contexte archi à l'IA.

**Ce qui a bien fonctionné :** la migration des balises HTML, du CSS tailwind et de l'archi gfénérale a été rapide. L'IA a bien compris le découpage des composants.

**Ce qui a nécessité une correction manuelle (Hallu) :**
-L'IA a généré du TS au lieu de JS pur.
-Elle a utilisé des syntaxes obsolètes (svelte 3/4) au lieu des runes de svelte 5. ainsi que la nomenclature lucide dépassée (`lucide-svelte-next` et `lucide-svelte`) au lieu de la plus récente (`@lucide/svelte`).
-Des erreurs de syntaxe HTML (balises `<a>` mal formées ou attributs `href` érronés).

**Impact de la structure :** L'arborescence propre du projet a empéché la migration de devenir chaotique, chaque erreur de l'IA pouvant être isolée fichier par fichier.


## Perspective professionnelle

**Adaption :** découvrir un nouveau framework est facilité lorsque l'on est familier avec les concepts fondamentaux de l'écosystème frontend (State, Props, Lifecycle).

**Architecture vs Syntaxe :** la syntaxe change d'une lib à l'autre (ex: `.map()`vs `v-for` vs `{#each}`), mais la réflexion autour de l'archi composant reste universelle.

**Réduction des barrières par l'IA :** les LLM permettent de traduire ou optimisé rapidement d'un framework à l'autre.

**L'importance de la validation humaine :** Comme illustré par les hallucinations sur TS, les mauvaises dépendances ou erreurs de syntaxe, l'IA reste un assistant. Le développeur doit impérativement lire, tester et d'aboguer le code généré pour garantir un standard de qualité professionnel.