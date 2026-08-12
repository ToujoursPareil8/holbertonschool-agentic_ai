<script setup>
import { steps } from "../data/steps"; //
import Eyebrow from "../components/Eyebrow.vue";

// Le composant About ne nécessite aucune logique interne complexe,
// il se contente d'importer les données 'steps' et le sous-composant 'Eyebrow'.
</script>

<template>
  <section id="about-section" class="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white">
    <div class="relative z-10 flex flex-col items-center max-w-4xl w-full">
      <Eyebrow text="What is agentic AI?" />

      <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4">
        Ai that does more than answer questions <br class="hidden md:block" />
        <span class="text-violet-300">It acts with purpose</span>
      </h2>

      <p class="text-sm md:text-base text-slate-300 mt-4">
        Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions,
        use tools, and adapt their actions across multiple steps. Instead of only responding to a
        single prompt, an AI agent can break down a task, plan a strategy, execute actions,
        evaluate results, and continue until the objective is reached.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
        <!-- col 1 : box fusionnée Traditional AI / Agentic AI -->
        <div class="p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-left flex flex-col gap-6">
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">Traditional AI</h3>
            <p class="text-slate-300 text-sm md:text-base">
              Responds to direct instructions, generates content, answers questions, or analyzes
              information within a limited interaction.
            </p>
          </div>
          <div class="border-t border-slate-800 pt-6">
            <h3 class="text-2xl font-bold text-violet-300 mb-4">Agentic AI</h3>
            <p class="text-slate-300 text-sm md:text-base">
              Understands a goal, chooses actions, uses external tools, follows a plan,
              and adjusts its behavior based on feedback.
            </p>
          </div>
        </div>

        <!-- col 2 : steps numérotées. <ol> car l'ordre a un sens -->
        <div class="relative py-4 text-left">
          <div class="absolute top-2 bottom-2 left-4 w-px bg-white/10"></div>
          <ol class="flex flex-col gap-8">
            <li v-for="step in steps" :key="step.number" class="flex items-start gap-4 relative">
              <div class="flex items-center justify-center rounded-full w-8 h-8 bg-violet-500 text-white shrink-0">
                {{ step.number }}
              </div>
              <div class="pt-1">
                <h4 class="text-lg font-bold text-white">{{ step.title }}</h4>
                <p class="text-slate-300 text-sm">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>