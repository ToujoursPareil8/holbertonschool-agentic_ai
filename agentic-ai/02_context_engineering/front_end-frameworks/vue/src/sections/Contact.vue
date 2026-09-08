<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { BookOpen, Users, Sparkles, User, AtSign, Mail, ArrowRight } from "lucide-vue-next"; //
import Eyebrow from "../components/Eyebrow.vue"; //
import SectionBackground from "../components/SectionBackground.vue"; //

const msgDef = "Fill in the form and we'll get back to you within 24h."; //
const msgSending = "Sending your message..."; //[cite: 20]
const msgSent = "Message sent! We'll be in touch soon."; //[cite: 20]

const highlights = [ //[cite: 20]
    { icon: BookOpen, label: "Project-based learning" }, //[cite: 20]
    { icon: Users, label: "Peer learning environment" }, //[cite: 20]
    { icon: Sparkles, label: "AI-powered workflows" }, //[cite: 20]
];

// État du formulaire
const formData = reactive({ name: "", email: "", message: "" }); //[cite: 20]
const isSending = ref(false); //[cite: 20]
const feedback = ref(msgDef); //[cite: 20]

// Propriétés calculées (remplaçant les variables dérivées de l'état dans le render)
const isNameValid = computed(() => formData.name.trim().length >= 2); //[cite: 20]
const isEmailValid = computed(() => formData.email.includes("@") && formData.email.includes(".")); //[cite: 20]
const isMessageValid = computed(() => formData.message.trim().length >= 10); //[cite: 20]
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isMessageValid.value); //[cite: 20]

// Remplacement du useEffect pour gérer le reset du message
let timer = null;
watch(feedback, (newVal) => {
    if (timer) clearTimeout(timer);
    if (newVal === msgSent) { //[cite: 20]
        timer = setTimeout(() => { feedback.value = msgDef; }, 4000); //[cite: 20]
    }
});

const handleSubmit = async () => {
    if (!isFormValid.value || isSending.value) return; //[cite: 20]

    isSending.value = true; //[cite: 20]
    feedback.value = msgSending; //[cite: 20]
    await new Promise((resolve) => setTimeout(resolve, 1500)); //[cite: 20]
    isSending.value = false; //[cite: 20]
    feedback.value = msgSent; //[cite: 20]
    
    // Réinitialisation
    formData.name = ""; //[cite: 20]
    formData.email = ""; //[cite: 20]
    formData.message = ""; //[cite: 20]
};

const focusColorClass = (value, isValid) => {
    if (value.length === 0) return "focus:border-violet-500"; //[cite: 20]
    return isValid ? "focus:border-violet-500" : "focus:border-red-500"; //[cite: 20]
};

const baseInputClasses =
    "w-full px-4 py-2 text-slate-50 rounded-md border border-slate-800 bg-black placeholder:text-slate-500 focus:outline-none transition-colors duration-200"; //[cite: 20]
</script>

<template>
  <section id="contact-section" class="py-24 bg-black relative overflow-hidden text-white">
    <SectionBackground />

    <div class="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
      <Eyebrow text="Start your AI journey" />

      <h2 class="text-5xl md:text-7xl font-black tracking-tight leading-none mt-6">
        Ready to Explore
        <br />
        <span class="text-violet-300">Agentic AI?</span>
      </h2>

      <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href="https://www.holbertonschool.com"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm"
        >
          Enroll at Holberton School
          <ArrowRight :size="16" aria-hidden="true" />
        </a>
        <a
          href="https://www.holbertonschool.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900 text-sm"
        >
          Need more information?
        </a>
      </div>

      <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6">
        <li v-for="highlight in highlights" :key="highlight.label" class="flex items-center gap-2">
          <component :is="highlight.icon" :size="16" class="text-violet-400" aria-hidden="true" />
          <span class="text-sm text-slate-400">{{ highlight.label }}</span>
        </li>
      </ul>

      <div class="w-full p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 mt-10 text-left">
        <!-- Remplacement de onSubmit={handleSubmit} -->
        <form @submit.prevent="handleSubmit" autocomplete="off" novalidate>
          <div class="mb-5">
            <label for="contact-name" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
              <User :size="16" class="text-violet-400" aria-hidden="true" />
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autocomplete="off"
              placeholder="Your full name..."
              v-model="formData.name"
              :class="`${baseInputClasses} ${focusColorClass(formData.name, isNameValid)}`"
            />
          </div>

          <div class="mb-5">
            <label for="contact-email" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
              <AtSign :size="16" class="text-violet-400" aria-hidden="true" />
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autocomplete="off"
              placeholder="you@example.com"
              v-model="formData.email"
              :class="`${baseInputClasses} ${focusColorClass(formData.email, isEmailValid)}`"
            />
          </div>

          <div class="mb-6">
            <label for="contact-message" class="flex items-center gap-2 text-sm font-semibold text-slate-100 mb-2">
              <Mail :size="16" class="text-violet-400" aria-hidden="true" />
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              :rows="4"
              autocomplete="off"
              placeholder="Tell us about your project or learning goals!"
              v-model="formData.message"
              :class="`${baseInputClasses} resize-none ${focusColorClass(formData.message, isMessageValid)}`"
            />
          </div>

          <button
            type="submit"
            :disabled="!isFormValid || isSending"
            class="w-full px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-violet-500 transition-colors"
          >
            {{ isSending ? "Sending..." : "Send message" }}
          </button>

          <p class="text-sm text-slate-400 mt-4 text-center" role="status">
            {{ feedback }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>