import React from 'react';

// Le placement en grille (col-span de la 1re carte) est désormais géré
// par le <li> parent dans Insights.jsx, pas ici : ce composant ne
// représente plus que le contenu visuel de la carte, indépendamment
// de sa position dans la grille.
const InsightCard = ({ category, title, description, image }) => {
    return (
        <article className="relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/5 bg-slate-950 shadow-xl shadow-slate-950/40 group transition-transform hover:-translate-y-1 duration-300 min-h-[400px] text-left h-full">
            {/* image de fond */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

            <div className="relative z-10 p-6 flex flex-col gap-3">
                <span className="w-fit px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
                    {category}
                </span>

                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-sm">{description}</p>
            </div>
        </article>
    );
};

export default InsightCard;
