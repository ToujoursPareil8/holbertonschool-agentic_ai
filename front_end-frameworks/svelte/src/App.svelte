<!-- App.svelte -->
<script>
  import Header from "./lib/components/Header.svelte";
  import Hero from "./lib/sections/Hero.svelte";
  import About from "./lib/sections/About.svelte";
  import Features from "./lib/sections/Features.svelte";
  import Insights from "./lib/sections/Insights.svelte";
  import Contact from "./lib/sections/Contact.svelte";
  import Footer from "./lib/sections/Footer.svelte";
</script>

<div class="flex min-h-screen flex-col bg-black"> <!--[cite: 2] -->
  <Header /> <!--[cite: 2] -->
  <Hero /> <!--[cite: 2] -->
  <main class="mx-auto max-w-7xl"> <!--[cite: 2] -->
    <About /> <!--[cite: 2] -->
    <Features /> <!--[cite: 2] -->
    <Insights /> <!--[cite: 2] -->
    <Contact /> <!--[cite: 2] -->
    <Footer /> <!--[cite: 2] -->
  </main> <!--[cite: 2] -->
</div> <!--[cite: 2] -->