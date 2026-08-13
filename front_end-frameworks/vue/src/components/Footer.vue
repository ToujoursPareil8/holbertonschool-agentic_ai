<script setup>
import { Camera, Music2, X, Play } from "lucide-vue-next"; //

const navigationLinks = [ //
    { label: "Hero section", href: "#hero-section" }, //
    { label: "About", href: "#about-section" }, //
    { label: "Features", href: "#features-section" }, //[cite: 6]
    { label: "Insights", href: "#insights-section" }, //[cite: 6]
    { label: "Contact", href: "#contact-section" }, //[cite: 6]
];

const holbertonLinks = [ //[cite: 6]
    { label: "About", href: "https://www.holbertonschool.com/about" }, //[cite: 6]
    { label: "Methodology", href: "https://www.holbertonschool.com/methodology" }, //[cite: 6]
    { label: "Story", href: "https://www.holbertonschool.com/story" }, //[cite: 6]
    { label: "Agenda", href: "https://www.holbertonschool.com/agenda" }, //[cite: 6]
];

const curriculumLinks = [ //[cite: 6]
    { label: "Bachelor", href: "https://www.holbertonschool.com/bachelor" }, //[cite: 6]
    { label: "Program", href: "https://www.holbertonschool.com/program" }, //[cite: 6]
];

const socialLinks = [ //[cite: 6]
    { icon: Camera, label: "Instagram", href: "https://instagram.com" }, //[cite: 6]
    { icon: Music2, label: "TikTok", href: "https://tiktok.com" }, //[cite: 6]
    { icon: X, label: "X", href: "https://x.com" }, //[cite: 6]
    { icon: Play, label: "Youtube", href: "https://youtube.com" }, //[cite: 6]
];

// Regroupement des listes de liens pour éviter de créer un sous-composant SFC séparé
const linkGroups = [
    { title: "Navigation", links: navigationLinks, external: false }, //[cite: 6]
    { title: "Holberton School", links: holbertonLinks, external: true }, //[cite: 6]
    { title: "Curriculum", links: curriculumLinks, external: true } //[cite: 6]
];

const currentYear = new Date().getFullYear(); //[cite: 6]
</script>

<template>
  <footer class="bg-black text-white border-t border-white/5">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="flex flex-col md:flex-row md:justify-between gap-12">
        
        <!-- logo -->
        <div class="max-w-xs">
          <div class="flex items-center gap-3">
            <img src="../assets/icon.svg" alt="Logo" class="w-8 h-8" />
            <span class="font-bold text-lg text-white">Agentic AI</span>
          </div>
          <p class="text-sm text-slate-500 mt-4">
            Explore the future of development with Agentic AI.
          </p>

          <!-- Réseaux -->
          <ul class="flex items-center gap-3 mt-6">
            <li v-for="social in socialLinks" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-colors"
              >
                <component :is="social.icon" :size="16" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <!-- 3 colonnes de liens -->
        <div v-for="group in linkGroups" :key="group.title">
          <h3 class="text-sm font-bold text-white">{{ group.title }}</h3>
          <ul class="flex flex-col gap-3 mt-4">
            <li v-for="link in group.links" :key="link.label">
              <a
                :href="link.href"
                :target="group.external ? '_blank' : null"
                :rel="group.external ? 'noopener noreferrer' : null"
                class="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-white/5 mt-12 pt-8">
        <p class="text-sm text-slate-500">
          © {{ currentYear }} Iriñy Aridy
        </p>
        <p class="text-sm text-slate-500">
          Built for the Holberton School Front-end Frameworks curriculum.
        </p>
      </div>
    </div>
  </footer>
</template>