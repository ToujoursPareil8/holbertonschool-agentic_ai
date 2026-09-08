<script setup>
import Header from "./components/Header.vue"; //
import Hero from "./sections/Hero.vue"; //
import About from "./sections/About.vue"; //
import Features from "./sections/Features.vue"; //[cite: 19]
import Insights from "./sections/Insights.vue"; //[cite: 19]
import Contact from "./sections/Contact.vue"; //[cite: 19]
import Footer from "./components/Footer.vue"; //[cite: 19]
</script>

<template>
  <div class="flex min-h-screen flex-col bg-black">
    <Header />
    <Hero />
    <main class="mx-auto max-w-7xl">
      <About />
      <Features />
      <Insights />
      <Contact />
      <Footer />
    </main>
  </div>
</template>