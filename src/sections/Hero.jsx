import React from "react";
import { Sparkle } from "lucide-react";

const StatData = [
    { id: 1, value: "10K+", label: "Active agents" },
    { id: 2, value: "99.9%", label: "Uptime" },
    { id: 3, value: "50M+", label: "Tasks automated" },
    { id: 4, value: "24/7", label: "Support" },
];

const Hero = () => {
    return (
        <section 
        id="hero-section"
        className="flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-violet-950 to-slate-950 text-white"> 
            <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
                {/*Eyebrow*/}
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
                    <Sparkle size={12} />
                    The future of coding
                    <Sparkle size={12} />
                </div>
                {/*Main Title*/}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                    Build smarter workflows <br className="hidden md:block" />
                    <span className="text-violet-300">with agentic AI</span>
                </h1>
                <div className="text-sm md:text-base text-slate-300 max-w-2xl mt-4">
                    <p>
                        Create autonomous AI agents that think, plan, and execute complex tasks. 
                        Transform your business with intelligent automation.
                    </p>
                </div>

                {/*Boutons*/}
                <div className="flex sm:flex-row items-center gap-4 mt-4">
                    <a href="#start-button" className="bg-violet-500 text-slate-50 text-sm font-semibold py-2 px-4 rounded-md hover:bg-violet-600">
                    Start learning with Holberton School</a>
                    <a href="#methodology-button" className="bg-black border border-white/5 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-slate-100">
                    Methodology</a>
                </div>
                {/*Stats*/}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                    {StatData.map((stat) => (
                        <div key={stat.id} className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
                            <div className="text-3xl font-bold text-violet-300">{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;