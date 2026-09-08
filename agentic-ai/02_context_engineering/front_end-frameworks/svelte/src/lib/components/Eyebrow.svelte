<!-- $lib/components/Eyebrow.svelte -->
<script>
    import { Sparkles } from '@lucide/svelte';
    let { text } = $props(); /*[cite: 7] */
</script>

<!-- Eyebrow for about, features, insights, contact sections --> <!--[cite: 7] -->
<div class="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10"> <!--[cite: 7] -->
    <Sparkles size={12} aria-hidden="true" /> <!--[cite: 7] -->
    {text} <!--[cite: 7] -->
    <Sparkles size={12} aria-hidden="true" /> <!--[cite: 7] -->
</div> <!--[cite: 7] -->