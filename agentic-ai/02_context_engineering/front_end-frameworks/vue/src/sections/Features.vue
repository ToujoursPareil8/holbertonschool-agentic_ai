<script setup>
import FeatureCard from "../components/FeatureCard.vue"; //
import { features } from "../data/features"; //
import Eyebrow from "../components/Eyebrow.vue"; //
import SectionBackground from "../components/SectionBackground.vue"; //
</script>

<template>
  <section id="features-section" class="py-24 bg-black relative overflow-hidden">
    <SectionBackground />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col items-center justify-center text-center">
        <Eyebrow text="Features" />
        <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-12">
          Everything You Need To Build <br class="hidden md:block" />
          <span class="text-violet-300">With powerful AI agents</span>
        </h2>
      </div>

      <!-- Features grid -->
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <li v-for="feature in features" :key="feature.id">
          <FeatureCard
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
          />
        </li>
      </ul>
    </div>
  </section>
</template>