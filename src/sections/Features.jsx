import React from "react";
import FeatureCard from "../components/FeatureCard";
import { features } from "../data/features";
import { Sparkle} from "lucide-react";

const Features = () => {
    return (
        <section id="features-section" className="py-24 bg-black relative overflow-hidden">
            {/* Bg grid*/}
            <div className="absolute inset-0 gbg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    {/*Eyebrow*/}
                    <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
                        <Sparkle size={12} />
                        Features
                        <Sparkle size={12} />
                    </div>
                    {/* Section h2*/}
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-12">
                        Everything You Need To Build <br className="hidden md:block" />
                        <span className="text-violet-300">With powerful AI agents</span>
                    </h2>
                </div>
                
                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Features;