<!-- $lib/sections/About.svelte -->
<script>
    import { steps } from "../data/steps.js"; /*[cite: 14] */
    import Eyebrow from "../components/Eyebrow.svelte"; /*[cite: 14] */
</script>

<section id="about-section" class="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white"> <!--[cite: 14] -->
    <div class="relative z-10 flex flex-col items-center max-w-4xl w-full"> <!--[cite: 14] -->
        <Eyebrow text="What is agentic AI?" /> <!--[cite: 14] -->

        <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4"> <!--[cite: 14] -->
            Ai that does more than answer questions <br class="hidden md:block" /> <!--[cite: 14] -->
            <span class="text-violet-300">It acts with purpose</span> <!--[cite: 14] -->
        </h2> <!--[cite: 14] -->

        <p class="text-sm md:text-base text-slate-300 mt-4"> <!--[cite: 14] -->
            Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions, <!--[cite: 14] -->
            use tools, and adapt their actions across multiple steps. Instead of only responding to a <!--[cite: 14] -->
            single prompt, an AI agent can break down a task, plan a strategy, execute actions, <!--[cite: 14] -->
            evaluate results, and continue until the objective is reached. <!--[cite: 14] -->
        </p> <!--[cite: 14] -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full"> <!--[cite: 14] -->
            <!-- col 1 : box fusionnée Traditional AI / Agentic AI --> <!--[cite: 14] -->
            <div class="p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-left flex flex-col gap-6"> <!--[cite: 14] -->
                <div> <!--[cite: 14] -->
                    <h3 class="text-2xl font-bold text-white mb-4">Traditional AI</h3> <!--[cite: 14] -->
                    <p class="text-slate-300 text-sm md:text-base"> <!--[cite: 14] -->
                        Responds to direct instructions, generates content, answers questions, or analyzes <!--[cite: 14] -->
                        information within a limited interaction. <!--[cite: 14] -->
                    </p> <!--[cite: 14] -->
                </div> <!--[cite: 14] -->
                <div class="border-t border-slate-800 pt-6"> <!--[cite: 14] -->
                    <h3 class="text-2xl font-bold text-violet-300 mb-4">Agentic AI</h3> <!--[cite: 14] -->
                    <p class="text-slate-300 text-sm md:text-base"> <!--[cite: 14] -->
                        Understands a goal, chooses actions, uses external tools, follows a plan, <!--[cite: 14] -->
                        and adjusts its behavior based on feedback. <!--[cite: 14] -->
                    </p> <!--[cite: 14] -->
                </div> <!--[cite: 14] -->
            </div> <!--[cite: 14] -->

            <!-- col 2 : steps numérotées. <ol> car l'ordre a un sens --> <!--[cite: 14] -->
            <div class="relative py-4 text-left"> <!--[cite: 14] -->
                <div class="absolute top-2 bottom-2 left-4 w-px bg-white/10"></div> <!--[cite: 14] -->
                <ol class="flex flex-col gap-8"> <!--[cite: 14] -->
                    {#each steps as step (step.number)}
                        <li class="flex items-start gap-4 relative"> <!--[cite: 14] -->
                            <div class="flex items-center justify-center rounded-full w-8 h-8 bg-violet-500 text-white shrink-0"> <!--[cite: 14] -->
                                {step.number} <!--[cite: 14] -->
                            </div> <!--[cite: 14] -->
                            <div class="pt-1"> <!--[cite: 14] -->
                                <h4 class="text-lg font-bold text-white">{step.title}</h4> <!--[cite: 14] -->
                                <p class="text-slate-300 text-sm">{step.description}</p> <!--[cite: 14] -->
                            </div> <!--[cite: 14] -->
                        </li> <!--[cite: 14] -->
                    {/each}
                </ol> <!--[cite: 14] -->
            </div> <!--[cite: 14] -->
        </div> <!--[cite: 14] -->
    </div> <!--[cite: 14] -->
</section> <!--[cite: 14] -->