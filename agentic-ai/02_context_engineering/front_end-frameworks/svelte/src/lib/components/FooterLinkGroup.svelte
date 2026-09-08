<script>
    let { title, links, external = false } = $props();
</script>

<div>
    <h3 class="text-sm font-bold text-white">{title}</h3>
    <ul class="flex flex-col gap-3 mt-4">
        {#each links as { label, href } (label)}
            <li>
                <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    class="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                >
                    {label}
                </a>
            </li>
        {/each}
    </ul>
</div>