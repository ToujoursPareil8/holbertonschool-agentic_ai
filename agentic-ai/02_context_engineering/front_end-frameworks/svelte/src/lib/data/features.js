// $lib/data/features.js
import { Bot, Network, Brain, Database, Wrench, Shield } from "@lucide/svelte";

export const features = [
    {
        id: 1,
        title: "Autonomous Agents",
        description: "Deploy self-sufficient Ai agents that can work 24/7 without supervision.",
        icon: Bot
    },
    {
        id: 2,
        title: "Multi-step Planning",
        description: "Break down complex goals into actionbable steps with intelligeent planning.",
        icon: Network
    },
    {
        id: 3,
        title: "Advance reasoning",
        description: "Leverage state-of-the-art language models for intellgnet devision making.",
        icon: Brain
    },
    {
        id: 4,
        title: "Memory & context",
        description: "Persistent memory allows agents to learn and improve over time.",
        icon: Database
    },
    {
        id: 5,
        title: "Tool integration",
        description: "Connect to thousands of APIs and services seamlessly.",
        icon: Wrench
    },
    {
        id: 6,
        title: "Enterprise Security",
        description: "Bank-level encryption and compliance with SOC2, GDPR, and HIPAA.",
        icon: Shield
    }
];

export default features;