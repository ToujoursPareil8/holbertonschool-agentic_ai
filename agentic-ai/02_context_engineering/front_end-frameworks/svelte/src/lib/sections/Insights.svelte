<script>
    import { onMount } from "svelte";
    import InsightCard from "../components/InsightCard.svelte";
    import { getInsights } from "../services/insightsService.js";
    import Eyebrow from "../components/Eyebrow.svelte";

    /**
     * @typedef {Object} Insight
     * @property {string} category
     * @property {string} title
     * @property {string} description
     * @property {string} image
     */

    /** @type {Insight[]} */
    let insights = $state([]);

    /** @type {string | null} */
    let error = $state(null);

    let isLoading = $state(true);

    onMount(() => {
        const fetchInsights = async () => {
            try {
                isLoading = true;
                const data = await getInsights();
                insights = data;
            } catch (err) {
                error = "Impossible de charger les données.";
                console.error(err);
            } finally {
                isLoading = false;
            }
        };
        fetchInsights();
    });
</script>

<section
    id="insights-section"
    class="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white"
> <!--[cite: 17] -->
    <div class="relative z-10 flex flex-col items-center max-w-4xl w-full px-6"> <!--[cite: 17] -->
        <Eyebrow text="Insights" /> <!--[cite: 17] -->
        <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4"> <!--[cite: 17] -->
            Explore agentic AI <br class="hidden md:block" /> <!--[cite: 17] -->
            <span class="text-violet-300">Through real-world scenes</span> <!--[cite: 17] -->
        </h2> <!--[cite: 17] -->
    </div> <!--[cite: 17] -->

    {#if error}
        <p class="mt-8 text-sm text-red-400">{error}</p> <!--[cite: 17] -->
    {/if}

    {#if !isLoading && !error}
        <div class="max-w-6xl w-full px-6 mt-12"> <!--[cite: 17] -->
            <ul class="grid grid-cols-1 md:grid-cols-3 gap-8"> <!--[cite: 17] -->
                {#each insights as insight, index (index)}
                    <li class={index === 0 ? "md:col-span-2" : ""}> <!--[cite: 17] -->
                        <InsightCard
                            index={index}
                            category={insight.category}
                            title={insight.title}
                            description={insight.description}
                            image={insight.image}
                        /> <!--[cite: 17] -->
                    </li> <!--[cite: 17] -->
                {/each}
            </ul> <!--[cite: 17] -->
        </div> <!--[cite: 17] -->
    {/if}
</section> <!--[cite: 17] -->