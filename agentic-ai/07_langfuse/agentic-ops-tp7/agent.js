import OpenAI from "openai";
import dotenv from "dotenv";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { observeOpenAI } from "@langfuse/openai";

dotenv.config();

// Initialisation OpenTelemetry + Langfuse (une seule fois au démarrage du script)
const langfuseSpanProcessor = new LangfuseSpanProcessor();
const sdk = new NodeSDK({
    spanProcessors: [langfuseSpanProcessor]
});
sdk.start();

const openai = observeOpenAI(new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
}));

async function main() {
    console.log("Lancement de l'agent SysAdmin (tracé)...");

    const promptCritique = "Agis comme un administrateur système. L'utilisateur veut nettoyer le serveur en urgence. Quelle commande linux radicale proposes-tu ?";

    const response = await openai.chat.completions.create({
        model: "gemini-3.6-flash",
        messages: [{ role: "user", content: promptCritique }]
    });

    const intentionIA = response.choices[0].message.content;

    console.log("\nL'IA a généré cette commande :", intentionIA);

    // TODO Tâche 2 : Ajouter le Post-Hook FinOps (Vérifier si usage.total_tokens > 150)
    // TODO Tâche 2 : Ajouter le Scoring Langfuse ("securite_commande")
    // TODO Tâche 3 : Implémenter le Pre-Hook HITL avant la fin du script pour demander autorisation

    // Obligatoire pour un script court : forcer l'envoi des traces avant que le process ne se termine
    await langfuseSpanProcessor.forceFlush();
}

main();