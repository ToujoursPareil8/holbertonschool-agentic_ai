<!-- $lib/components/FeatureCard.svelte -->
<script>
    let { title, description, icon: Icon } = $props(); /*[cite: 8] */
</script>

<article class="p-8 rounded-2xl border border-white/5 bg-slate-950 shadow-xl shadow-slate-950/40 flex flex-col items-start gap-3 transition-transform hover:scale-105"> <!--[cite: 8] -->
    <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40 text-white mb-4"> <!--[cite: 8] -->
        <Icon size={24} aria-hidden="true" /> <!--[cite: 8] -->
    </div> <!--[cite: 8] -->
    <h3 class="text-lg font-bold text-white tracking-tight">{title}</h3> <!--[cite: 8] -->
    <p class="text-sm md:text-base text-slate-300 leading-relaxed">{description}</p> <!--[cite: 8] -->
</article> <!--[cite: 8] -->