import React from "react";
import { Sparkle } from "lucide-react";

{/* Eyebrow for about, features, insights, contact sections */}
const Eyebrow = ({ text }) => (
    <div className="flex items-center gap-2 px-4 py-2 text-xs text-violet-300 rounded-full border border-violet-500/20 bg-violet-500/10">
        <Sparkle size={12} aria-hidden="true" />
        {text}
        <Sparkle size={12} aria-hidden="true" />
    </div>
);

export default Eyebrow;