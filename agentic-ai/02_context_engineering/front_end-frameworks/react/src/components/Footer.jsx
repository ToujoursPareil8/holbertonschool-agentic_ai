import React from "react";
import { Camera, Music2, X, Play } from "lucide-react";


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

const FooterLinkGroup = ({ title, links, external }) => (
    <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <ul className="flex flex-col gap-3 mt-4">
            {links.map(({ label, href }) => (
                <li key={label}>
                    <a
                        href={href}
                        {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        {label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row md:justify-between gap-12">
                    {/* logo */}
                    <div className="max-w-xs">
                        <div className="flex items-center gap-3">
                            <img src="./icon.svg" alt="Logo" className="w-8 h-8" />
                            <span className="font-bold text-lg text-white">Agentic AI</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-4">
                            Explore the future of development with Agentic AI.
                        </p>

                        {/* Réseaux */}
                        <ul className="flex items-center gap-3 mt-6">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-colors"
                                    >
                                        <Icon size={16} aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3 colde liens */}
                    <FooterLinkGroup title="Navigation" links={navigationLinks} />
                    <FooterLinkGroup
                        title="Holberton School"
                        links={holbertonLinks}
                        external
                    />
                    <FooterLinkGroup title="Curriculum" links={curriculumLinks} external />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-white/5 mt-12 pt-8">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Iriñy Aridy
                    </p>
                    <p className="text-sm text-slate-500">
                        Built for the Holberton School Front-end Frameworks curriculum.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;