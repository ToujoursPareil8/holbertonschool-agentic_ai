import React from 'react';


const FeatureCard = ({ title, description, icon: Icon }) => {

    return (
        <article className="p-8 rounded-2xl border border-white/5 bg-slate-950 shadow-xl shadow-slate-950/40 flex flex-col items-start gap-3 transition-transform hover:scale-105">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40 text-white mb-4">
                <Icon size={24} aria-hidden="true" />
            </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">{description}</p>
        </article>
    );
};

export default FeatureCard;