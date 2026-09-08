# React vs Vue

## Components

Vue utilise des SFC (Single File Components) avec une extension `.vue`. On utilise une séparation des préoccupations dans le même fichier : la logique JS avec `<script setup>` et le HTML avec `<template>`. Exemple :

```vue
<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div class="flex flex-col">
    <Header/>
  </div>
</template>
```

### Similarités et Différences

Les deux utilisent des composants réutilisables et modulaires. Les deux permettent de créer de l'UI.
React traite tout en JS, Vue impose une structure séparée avec `<script>` et `<template>`.

## Templates

- **JSX** : React utilise une syntaxe qui mélange JS et HTML.
- **Vue** : Vue utilise une syntaxe de template basée sur HTML.

### Avantages et désavantages

**JSX**
- Avantage : flexibilité, possibilité d'utiliser JS directement dans le markup.
- Désavantage : apprentissage.

**Vue**
- Avantage : lisibilité.
- Désavantage : les règles de syntaxe du template.

## Props

**React** : les props sont passées en tant qu'arguments dans la fonction du composant et déstructurées immédiatement.

```jsx
// FeatureCard.jsx
const FeatureCard = ({ title, description, icon: Icon }) => { ... }
```

**Vue** : props déclarées dans `<script setup>` en utilisant la macro `defineProps`.

```vue
// FeatureCard.vue
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: [Object, Function], required: true }
});
```

### Similarités et Différences

Les deux vont dans un sens descendant (parent → enfant) et déclenchent un re-render quand les props changent.
Vue offre un moyen robuste et intégré de définir les types de props, les valeurs par défaut et les contraintes de manière native. React s'appuie sur des librairies externes ou nécessite TypeScript pour une rigueur similaire.

## State management

React utilise le hook `useState`, qui retourne un tableau avec la valeur actuelle et une fonction de mise à jour.

```jsx
const [isLoading, setIsLoading] = useState(true);
// Mutation: setIsLoading(false);
```

Vue utilise `ref` et `reactive`.

```js
const isLoading = ref(true);
// Mutation: isLoading.value = false;
```

### Similarités et Différences

Les deux donnent un état local réactif qui déclenche des mises à jour de l'UI.
React remplace l'état entièrement via les fonctions `set`, Vue mute l'état directement et s'appuie sur son propre système de Proxy pour ne mettre à jour le DOM que là où la variable est utilisée.

## Lifecycle

React regroupe presque toute la logique dans le hook `useEffect`, contrôlé par un tableau de dépendances.

```jsx
// Insights.jsx
useEffect(() => {
    fetchInsights();
}, []); // Empty array = run on mount
```

Vue donne des hooks de lifecycle nommés (`onMounted`, `onUnmounted`) et sépare le suivi des changements de données dans `watch` ou `watchEffect`.

```js
// Insights.vue
onMounted(async () => {
    await fetchInsights();
});
```

### Similarités et Différences

Les deux permettent d'exécuter des side-effects pendant des phases spécifiques de la vie d'un composant.
Vue a une approche plus sémantique et moins sujette à l'erreur ; les tableaux de dépendances de React sont plus compliqués à utiliser, avec le risque de créer des boucles infinies.

## Conditional rendering

React utilise des opérateurs JS et des ternaires directement dans le JSX.

```jsx
{error && <p className="text-red-400">{error}</p>}
```

Vue utilise des directives structurées (`v-if`, `v-else-if`, `v-else`, `v-show`) attachées directement aux tags HTML.

```vue
<p v-if="error" class="text-red-400">{{ error }}</p>
```

### Similarités et Différences

Les deux ajoutent et retirent des nœuds du DOM dynamiquement selon un booléen.
Vue garde le template plus propre et centré sur le HTML, React a une approche qui peut être plus imbriquée et donc plus difficile à lire avec les ternaires dans le JSX.

## Dynamic rendering

React utilise la méthode native `.map()` de JS.

```jsx
{features.map((feature) => (
    <li key={feature.id}><FeatureCard {...feature}/></li>
))}
```

Vue utilise la directive `v-for`.

```vue
<li v-for="feature in features" :key="feature.id">
    <FeatureCard :title="feature.title"/>
</li>
```

### Similarités et Différences

Les deux requièrent un attribut `key` unique sur l'élément pour le lier au DOM.
Le `v-for` de Vue est plus lisible, React nous force à écrire une fonction JS pour mapper un tableau.

## Forms

React utilise des "controlled components". Il faut lier manuellement la valeur à l'état et créer un gestionnaire d'événement `onChange` pour mettre à jour l'état.

```jsx
// Contact.jsx
<input 
  value={formData.name} 
  onChange={(e) => setFormData({...formData, name: e.target.value})} 
/>
```

Vue introduit `v-model`, une directive qui crée automatiquement une association à double sens des données.

```vue
// Contact.vue
<input v-model="formData.name" />
```

### Similarités et Différences

Les valeurs des inputs restent dans le state JS.
Vue réduit le boilerplate pour les formulaires : `v-model` gère automatiquement l'écoute des événements et la mise à jour de l'état sous le capot.

## Events

React : les événements sont passés en props camelCase contenant des fonctions.

```jsx
<form onSubmit={handleSubmit}>
```

Vue utilise le symbole `@` (diminutif de `v-on:`) suivi du nom de l'événement en minuscule. Vue donne aussi de puissants event modifiers.

```vue
<form @submit.prevent="handleSubmit">
```

### Similarités et Différences

Les deux attachent les event listeners au nœud du DOM et exécutent la fonction JS.
Les event modifiers de Vue (`.prevent`, `.stop`, `.enter`) permettent au développeur de gérer la logique événementielle du DOM directement dans le template, gardant la logique du script focalisée uniquement sur la manipulation de données. En React, il faut le faire manuellement avec `e.preventDefault()`.

## Project organization

L'architecture est presque identique : `components/`, `sections/`, `data/` et `services/`. Les deux ont un seul point d'entrée : `main.jsx`/`main.js`.

## AI-assisted migration

**Outil utilisé** : Gemini

**Ce qui a bien fonctionné** :
- La traduction syntaxique : l'IA a parfaitement traduit le JSX en Vue.
- La logique de mapping : la gestion des hooks en Vue était efficace.

**Leçons apprises** :
- L'IA facilite énormément les tâches répétitives qui demandent beaucoup de back and forth.
- Toujours donner le bon contexte.