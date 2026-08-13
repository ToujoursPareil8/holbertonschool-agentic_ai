<!-- $lib/sections/Features.svelte -->
<script>
    import FeatureCard from "../components/FeatureCard.svelte"; /*[cite: 15] */
    import { features } from "../data/features.js"; /*[cite: 15] */
    import Eyebrow from "../components/Eyebrow.svelte"; /*[cite: 15] */
    import SectionBackground from "../components/SectionBackground.svelte"; /*[cite: 15] */
</script>

<section id="features-section" class="py-24 bg-black relative overflow-hidden"> <!--[cite: 15] -->
    <SectionBackground /> <!--[cite: 15] -->

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> <!--[cite: 15] -->
        <div class="flex flex-col items-center justify-center text-center"> <!--[cite: 15] -->
            <Eyebrow text="Features" /> <!--[cite: 15] -->
            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none mt-12"> <!--[cite: 15] -->
                Everything You Need To Build <br class="hidden md:block" /> <!--[cite: 15] -->
                <span class="text-violet-300">With powerful AI agents</span> <!--[cite: 15] -->
            </h2> <!--[cite: 15] -->
        </div> <!--[cite: 15] -->

        <!-- Features grid --> <!--[cite: 15] -->
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"> <!--[cite: 15] -->
            {#each features as feature (feature.id)}
                <li> <!--[cite: 15] -->
                    <FeatureCard
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                    /> <!--[cite: 15] -->
                </li> <!--[cite: 15] -->
            {/each}
        </ul> <!--[cite: 15] -->
    </div> <!--[cite: 15] -->
</section> <!--[cite: 15] -->