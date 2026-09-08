<!-- $lib/sections/Hero.svelte -->
<script>
    import Eyebrow from "../components/Eyebrow.svelte"; /*[cite: 13] */

    const StatData = [ /*[cite: 13] */
        { id: 1, value: "10K+", label: "Active agents" }, /*[cite: 13] */
        { id: 2, value: "99.9%", label: "Uptime" }, /*[cite: 13] */
        { id: 3, value: "50M+", label: "Tasks automated" }, /*[cite: 13] */
        { id: 4, value: "24/7", label: "Support" }, /*[cite: 13] */
    ];
</script>

<section
    id="hero-section"
    class="flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-violet-950 to-slate-950 text-white"
> <!--[cite: 13] -->
    <div class="relative z-10 flex flex-col items-center max-w-4xl w-full"> <!--[cite: 13] -->
        <Eyebrow text="The future of coding" /> <!--[cite: 13] -->

        <h1 class="text-5xl md:text-7xl font-black tracking-tight leading-none"> <!--[cite: 13] -->
            Build smarter workflows <br class="hidden md:block" /> <!--[cite: 13] -->
            <span class="text-violet-300">with agentic AI</span> <!--[cite: 13] -->
        </h1> <!--[cite: 13] -->
        <div class="text-sm md:text-base text-slate-300 max-w-2xl mt-4"> <!--[cite: 13] -->
            <p> <!--[cite: 13] -->
                Create autonomous AI agents that think, plan, and execute complex tasks. <!--[cite: 13] -->
                Transform your business with intelligent automation. <!--[cite: 13] -->
            </p> <!--[cite: 13] -->
        </div> <!--[cite: 13] -->

        <!-- Boutons --> <!--[cite: 13] -->
        <div class="flex sm:flex-row items-center gap-4 mt-4"> <!--[cite: 13] -->
            <a href="#start-button" class="bg-violet-500 text-slate-50 text-sm font-semibold py-2 px-4 rounded-md hover:bg-violet-600"> <!--[cite: 13] -->
                Start learning with Holberton School</a> <!--[cite: 13] -->
            <a href="#methodology-button" class="bg-black border border-white/5 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-slate-100"> <!--[cite: 13] -->
                Methodology</a> <!--[cite: 13] -->
        </div> <!--[cite: 13] -->

        <!-- Stats --> <!--[cite: 13] -->
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 w-full"> <!--[cite: 13] -->
            {#each StatData as stat (stat.id)}
                <li class="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40"> <!--[cite: 13] -->
                    <div class="text-3xl font-bold text-violet-300">{stat.value}</div> <!--[cite: 13] -->
                    <div class="text-xs text-slate-500">{stat.label}</div> <!--[cite: 13] -->
                </li> <!--[cite: 13] -->
            {/each}
        </ul> <!--[cite: 13] -->
    </div> <!--[cite: 13] -->
</section> <!--[cite: 13] -->