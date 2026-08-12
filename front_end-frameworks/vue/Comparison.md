## Components :

Vue utilise SFC avec un extension .vue, on utilise une séparation de préoccupations dans le meme fichier pour la logique js avec `<script setup>` et `<template>` pour HTML example

><script setup>
>import Header from "./components/Header.vue";
></script>
>
><template>
>  <div class="flex flex-col">
>    <Header/>
>  </div>
></template>

### Similarités et Différences : 

les deux utilisent des composants réutilisable et modulaire. Les deux permettent de créer de l'UI.
React traite tout en js, Vue force une structure séparée avec `<script>` et `<template>`.



## Templates :

Jsx : react utilise une syntaxe qui mélange js et html
Vue : vue utilise une syntax template basé sur html

### Avantage et désavantage :

JSX avantage : flexibilité, possibilité d'utiliser JS directement dans le markup
désavantage : Apprentissage

Vue : lisibilité.
désavantage : les regles de syntax template



## Props :

React : les props sont passé en tant qu'arguments dans la fonction du composant et destrucutrés immédiatement.

>// FeatureCard.jsx
>const FeatureCard = ({ title, description, icon: Icon }) => { ... }

Vue : props déclarés dans `<script setup>` en utilisant `defineProps` macro 

>// FeatureCard.vue
>const props = defineProps({
>  title: { type: String, required: true },
>  description: { type: String, required: true },
>  icon: { type: [Object, Function], required: true }
>});

### Similarités et Différences :
Les deux vont dans un sens descendant les deux enclenchent un re-render quand les props changent
Vue offre un moyen robust et intégré de def les types de props, valeurs pas défaut et les contraintes de manière native. React s'appuie sur des lib externes où nécessite Typescript pour un rigueur similaire 



## State management:

React utilise des useStates hooks, qui retourne un tableau avec la valent actuel et une fontion set

>const [isLoading, setIsLoading] = useState(true);
>// Mutation: setIsLoading(false);

Vue utilise `ref` et `reactive`

>const isLoading = ref(true);
>// Mutation: isLoading.value = false;

### Similarités et Différences :

Les deux donne un état local reactive qui enclenche des update UI
React remplace les états entierement via les fonctions set, Vue transforme les états directement and s'appuie sur son propre systeme de Proxy to update le DOM uniquement où la variable est utilisée.



## Lifecycle:

React regroupe presque toute la logique dans le hook `useEffect` controlé par un tableau de dépendance 

>// Insights.jsx
>useEffect(() => {
>    fetchInsights();
>}, []); // Empty array = run on mount

Vue donne des hooks lifecycle nommés (`onMounted`, `onUnmounted`) et sépare le suivi des changements de données dans `watch` ou `watchEffect`

>// Insights.vue
>onMounted(async () => {
>    await fetchInsights();
>});

### Similarités et Différences :

les deux permettent d'executé des side-effeects pendant des phases spécifiques de l'existence d'un composant
Vue a une approche plus sémantique et moins sujette à l'erreur, les tableaux de dépendance de React sont compliqué a utilisé avec le risque de faire des boucles infinies



## Conditional rendering:

React utlise des opérateurs JS et ternaire directement dans le JSX

>{error && <p className="text-red-400">{error}</p>}

Vue utilise des directives structurées (`v-if`,`v-else-if`,`v-else`,`v-show`) attaché directiment aux tags HTML

><p v-if="error" class="text-red-400">{{ error }}</p>

### Similarités et Différences :

Les deux ajoutent et enlevent les node du DOM dynamiquement avec un bool
Vue garde le template plus propre et centré sur HTML, React a une approche qui peut et plus imbriqué et donc dur à lire avec les ternaires de JSX



## Dynamic rendering:

React utilise le tableau `.map()` natif de JS

>{features.map((feature) => (
>    <li key={feature.id}><FeatureCard {...feature}/></li>
>))}

Vue utilise la directuve `v-for`

><li v-for="feature in features" :key="feature.id">
>    <FeatureCard :title="feature.title"/>
></li>

### Similarités et Différences :

les deux requierent un attribut `key` unique sur l'élément pour le lié au DOM
le `v-for` de vue est plus lisible, react nous force a écrire une fonction JS pour mapper un tableau



## Forms:

React utiulise des "controlled components". il faut lié manuellement la valeur à l'état et créer uyn gestionnaire d'event `onChange` pour mettre à jour l'état

>// Contact.jsx
><input 
>  value={formData.name} 
>  onChange={(e) => setFormData({...formData, name: e.target.value})} 
>/>

Vue introduit `v-model`, une directuve qui crée automatiquement une association a deux sens des données

>// Contact.vue
><input v-model="formData.name" />

### Similarités et Différences :
les inputs de valeur reste dans le JS state
Vue réduit le boilerplate code pour le formulaire `v-model` gère automatiquement les event listening et state update sous le capot.



## Events:

Reat : les event sont passés en camelCase props contenant des fonctions

><form onSubmit={handleSubmit}>

Vue utilise le symbol `@` (diminutif de `v-on:`) suivi du nom de l'event en minuscule. Vue donne aussi des puissants event modifiers

```
><form @submit.prevent="handleSubmit">
```

### Similarités et Différences :

les deux attechent les event listeners au node du DOM et execute la fonction JS
les event modifiers de Vue (`.prevent`,`.stop`,`.enter`) permettent au dev de s'occuper de la logique event DOM directement dans le template, pgardant la logique script focus seulement sur  la manip de donées. En react il faut le faire manuellement avec `e.preventDefault()`.



## Project organization:

l'architecte est preque identique : compents/, sections/, data/ et services/. les deux ont 1 seul points d'entrées main.jsx/main.js.



## AI-assisted migration:

Outils utilisés : Gemini
What worked well : 
La traduction suntaxique: l'ia a parfaitement traduit le jsx en vue, 
la logique map : ghestion des hooks en vue était efficace

Lessons learned :
Ai facilite énormement les taches répétitives qui demandent beaucoup de back and forth.
Toujours donné le bon contexte