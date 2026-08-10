import React from "react";

// Fond en grille utilisé derrière certaines sections (Features, Contact).
// Aucune prop : c'est un décor purement visuel, toujours identique.
const SectionBackground = () => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 pointer-events-none" />
);

export default SectionBackground;
