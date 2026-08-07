import React, { useState, useEffect } from 'react';
import InsightCard from '../components/InsightCard';
import { getInsights } from '../services/insightsService';
import { Sparkle } from 'lucide-react';

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
                {/* Eyebrow */}
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
                    <Sparkle size={12} />
                    Insights
                    <Sparkle size={12} />
                </div>
                {/* Section h2 */}
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none mt-4">
                    Explore agentic AI <br className="hidden md:block" />
                    <span className="text-violet-300">Through real-world scenes</span>
                </h2>
            </div>

            {/* Erreur */}
            {error && (
                <p className="mt-8 text-sm text-red-400">{error}</p>
            )}

            {/* Grille */}
            {!isLoading && !error && (
                <div className="max-w-6xl w-full px-6 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {insights.map((insight, index) => (
                            <InsightCard
                                key={index}
                                index={index}
                                category={insight.category}
                                title={insight.title}
                                description={insight.description}
                                image={insight.image}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Insights;