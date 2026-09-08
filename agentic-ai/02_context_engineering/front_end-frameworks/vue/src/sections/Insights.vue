<script setup>
import { ref, onMounted } from 'vue';
import InsightCard from "../components/InsightCard.vue"; //
import { getInsights } from "../services/insightsService"; //
import Eyebrow from "../components/Eyebrow.vue"; //

const insights = ref([]); //
const error = ref(null); //
const isLoading = ref(true); //

onMounted(async () => {
  try {
    isLoading.value = true; //
    const data = await getInsights(); //[cite: 18]
    insights.value = data; //[cite: 18]
  } catch (err) {
    error.value = "Impossible de charger les données."; //[cite: 18]
    console.error(err); //[cite: 18]
  } finally {
    isLoading.value = false; //[cite: 18]
  }
});
</script>

<template>
  <section
    id="insights-section"
    class="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white"
  >
    <div class="relative z-10 flex flex-col items-center max-w-4xl w-full px-6">
      <Eyebrow text="Insights" />
      <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4">
        Explore agentic AI <br class="hidden md:block" />
        <span class="text-violet-300">Through real-world scenes</span>
      </h2>
    </div>

    <p v-if="error" class="mt-8 text-sm text-red-400">{{ error }}</p>

    <div v-if="!isLoading && !error" class="max-w-6xl w-full px-6 mt-12">
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <li v-for="(insight, index) in insights" :key="index" :class="index === 0 ? 'md:col-span-2' : ''">
          <InsightCard
            :index="index"
            :category="insight.category"
            :title="insight.title"
            :description="insight.description"
            :image="insight.image"
          />
        </li>
      </ul>
    </div>
  </section>
</template>