import React from "react";
import FeatureCard from "../components/FeatureCard";
import { features } from "../data/features";
import Eyebrow from "../components/Eyebrow";
import SectionBackground from "../components/SectionBackground";

const Features = () => {
    return (
        <section id="features-section" className="py-24 bg-black relative overflow-hidden">
            <SectionBackground />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <Eyebrow text="Features" />
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-12">
                        Everything You Need To Build <br className="hidden md:block" />
                        <span className="text-violet-300">With powerful AI agents</span>
                    </h2>
                </div>

                {/* Features grid */}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {features.map((feature) => (
                        <li key={feature.id}>
                            <FeatureCard
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Features;