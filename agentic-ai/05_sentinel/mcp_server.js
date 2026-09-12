import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

// Charger .env de manière robuste, quel que soit le cwd depuis lequel VS Code lance le process
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const token = process.env.GITHUB_TOKEN;

// 1. Initialisation du Serveur
const server = new Server(
  { name: "sentinel-github-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. Déclaration de l'outil (ce que Copilot peut voir)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "fetch_github_issues",
        description: "Récupère les 5 dernières issues (hors Pull Requests) d'un dépôt GitHub public.",
        inputSchema: {
          type: "object",
          properties: {
            owner: { type: "string", description: "Le propriétaire du dépôt (ex: 'holbertonschool')" },
            repo: { type: "string", description: "Le nom du dépôt (ex: 'holbertonschool-agentic_ai')" }
          },
          required: ["owner", "repo"]
        }
      }
    ]
  };
});

// 3. Exécution de la logique (ce que Copilot peut faire)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "fetch_github_issues") {
    throw new Error("Outil inconnu");
  }

  const { owner, repo } = request.params.arguments;

  if (!token) {
    return {
      content: [{ type: "text", text: "Erreur: GITHUB_TOKEN absent de l'environnement (.env)" }],
      isError: true,
    };
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&state=all`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Sentinel-MCP-Server"
      }
    });

if (!response.ok) {
  let detail = response.statusText;
  try {
    const errorBody = await response.json();
    if (errorBody.message) detail = errorBody.message;
  } catch {
    // le corps n'est pas du JSON exploitable, on garde statusText
  }

  return {
    content: [{
      type: "text",
      text: `Erreur HTTP GitHub (${response.status}): ${detail}`
    }],
    isError: true,
  };
}

    const issues = await response.json();

    return {
      content: [{
        type: "text",
        text: JSON.stringify(issues.filter(issue => !issue.pull_request).slice(0, 5), null, 2)
      }]
    };

  } catch (error) {
    // Panne réseau, timeout, DNS, etc. -> ne jamais crasher le serveur
    return {
      content: [{ type: "text", text: `Échec réseau: ${error.message}` }],
      isError: true,
    };
  }
});

// 4. Démarrage du serveur sur stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sentinel MCP Server démarré et en écoute sur stdio");
}

main().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});