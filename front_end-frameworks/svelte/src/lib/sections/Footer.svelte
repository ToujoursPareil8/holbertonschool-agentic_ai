<script>
    import { Camera, Music2, X, Play } from "@lucide/svelte";
    import FooterLinkGroup from "../components/FooterLinkGroup.svelte";

    const navigationLinks = [
        { label: "Hero section", href: "#hero-section" },
        { label: "About", href: "#about-section" },
        { label: "Features", href: "#features-section" },
        { label: "Insights", href: "#insights-section" },
        { label: "Contact", href: "#contact-section" },
    ];

    const holbertonLinks = [
        { label: "About", href: "https://www.holbertonschool.com/about" },
        { label: "Methodology", href: "https://www.holbertonschool.com/methodology" },
        { label: "Story", href: "https://www.holbertonschool.com/story" },
        { label: "Agenda", href: "https://www.holbertonschool.com/agenda" },
    ];

    const curriculumLinks = [
        { label: "Bachelor", href: "https://www.holbertonschool.com/bachelor" },
        { label: "Program", href: "https://www.holbertonschool.com/program" },
    ];

    const socialLinks = [
        { icon: Camera, label: "Instagram", href: "https://instagram.com" },
        { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
        { icon: X, label: "X", href: "https://x.com" },
        { icon: Play, label: "Youtube", href: "https://youtube.com" },
    ];

    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-black text-white border-t border-white/5">
    <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="flex flex-col md:flex-row md:justify-between gap-12">
            <!-- logo -->
            <div class="max-w-xs">
                <div class="flex items-center gap-3">
                    <img src="./icon.svg" alt="Logo" class="w-8 h-8" />
                    <span class="font-bold text-lg text-white">Agentic AI</span>
                </div>
                <p class="text-sm text-slate-500 mt-4">
                    Explore the future of development with Agentic AI.
                </p>

                <!-- Réseaux -->
                <ul class="flex items-center gap-3 mt-6">
                    {#each socialLinks as { icon: Icon, label, href } (label)}
                        <li>
                            <a
                                {href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                class="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-colors"
                            >
                                <Icon size={16} aria-hidden="true" />
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- 3 colde liens -->
            <FooterLinkGroup title="Navigation" links={navigationLinks} />
            <FooterLinkGroup title="Holberton School" links={holbertonLinks} external />
            <FooterLinkGroup title="Curriculum" links={curriculumLinks} external />
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-white/5 mt-12 pt-8">
            <p class="text-sm text-slate-500">
                © {currentYear} Iriñy Aridy
            </p>
            <p class="text-sm text-slate-500">
                Built for the Holberton School Front-end Frameworks curriculum.
            </p>
        </div>
    </div>
</footer>