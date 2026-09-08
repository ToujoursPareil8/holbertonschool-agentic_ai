<!-- $lib/components/InsightCard.svelte -->
<script>
    let { index,category, title, description, image } = $props(); /*[cite: 10] */
</script>

<article class="relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/5 bg-slate-950 shadow-xl shadow-slate-950/40 group transition-transform hover:-translate-y-1 duration-300 min-h-[400px] text-left h-full"> <!--[cite: 10] -->
    <!-- image de fond --> <!--[cite: 10] -->
    <img
        src={image}
        alt={title}
        class="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105"
    /> <!--[cite: 10] -->
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div> <!--[cite: 10] -->

    <div class="relative z-10 p-6 flex flex-col gap-3"> <!--[cite: 10] -->
        <span class="w-fit px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10"> <!--[cite: 10] -->
            {category} <!--[cite: 10] -->
        </span> <!--[cite: 10] -->

        <h3 class="text-lg font-bold text-white tracking-tight">{title}</h3> <!--[cite: 10] -->
        <p class="text-sm md:text-base text-slate-300 leading-relaxed max-w-sm">{description}</p> <!--[cite: 10] -->
    </div> <!--[cite: 10] -->
</article> <!--[cite: 10] -->