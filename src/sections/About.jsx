import React from "react";
import { steps } from "../data/steps";
import Eyebrow from "../components/Eyebrow";

const About = () => {
    return (
        <section id="about-section" className="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white">
            <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
                <Eyebrow text="What is agentic AI?" />

                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4">
                    Ai that does more than answer questions <br className="hidden md:block" />
                    <span className="text-violet-300">It acts with purpose</span>
                </h2>

                <p className="text-sm md:text-base text-slate-300 mt-4">
                    Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions,
                    use tools, and adapt their actions across multiple steps. Instead of only responding to a
                    single prompt, an AI agent can break down a task, plan a strategy, execute actions,
                    evaluate results, and continue until the objective is reached.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
                    {/* col 1 : box fusionnée Traditional AI / Agentic AI */}
                    <div className="p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40 text-left flex flex-col gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Traditional AI</h3>
                            <p className="text-slate-300 text-sm md:text-base">
                                Responds to direct instructions, generates content, answers questions, or analyzes
                                information within a limited interaction.
                            </p>
                        </div>
                        <div className="border-t border-slate-800 pt-6">
                            <h3 className="text-2xl font-bold text-violet-300 mb-4">Agentic AI</h3>
                            <p className="text-slate-300 text-sm md:text-base">
                                Understands a goal, chooses actions, uses external tools, follows a plan,
                                and adjusts its behavior based on feedback.
                            </p>
                        </div>
                    </div>

                    {/* col 2 : steps numérotées. <ol> car l'ordre a un sens */}
                    <div className="relative py-4 text-left">
                        <div className="absolute top-2 bottom-2 left-4 w-px bg-white/10"></div>
                        <ol className="flex flex-col gap-8">
                            {steps.map((step) => (
                                <li key={step.number} className="flex items-start gap-4 relative">
                                    <div className="flex items-center justify-center rounded-full w-8 h-8 bg-violet-500 text-white shrink-0">
                                        {step.number}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-lg font-bold text-white">{step.title}</h4>
                                        <p className="text-slate-300 text-sm">{step.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;