import React, { useState, useEffect } from "react";
import InsightCard from "../components/InsightCard";
import { getInsights } from "../services/insightsService";
import Eyebrow from "../components/Eyebrow";

const Insights = () => {
    const [insights, setInsights] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setIsLoading(true);
                const data = await getInsights();
                setInsights(data);
            } catch (err) {
                setError("Impossible de charger les données.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInsights();
    }, []);

    return (
        <section
            id="insights-section"
            className="flex flex-col items-center justify-center text-center py-20 overflow-hidden bg-black text-white"
        >
            <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-6">
                <Eyebrow text="Insights" />
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4">
                    Explore agentic AI <br className="hidden md:block" />
                    <span className="text-violet-300">Through real-world scenes</span>
                </h2>
            </div>

            {error && (
                <p className="mt-8 text-sm text-red-400">{error}</p>
            )}

            {!isLoading && !error && (
                <div className="max-w-6xl w-full px-6 mt-12">
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {insights.map((insight, index) => (
                            <li key={index} className={index === 0 ? "md:col-span-2" : ""}>
                                <InsightCard
                                    index={index}
                                    category={insight.category}
                                    title={insight.title}
                                    description={insight.description}
                                    image={insight.image}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default Insights;