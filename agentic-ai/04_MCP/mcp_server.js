import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 1. Initialisation du Serveur
const server = new Server(
  { name: "crm-mock-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. Base de données en mémoire
const DATABASE = {
  "dev@entreprise.com": { id: 101, status: "Active", order_status: "Livrée" },
  "ceo@entreprise.com": { id: 102, status: "VIP", order_status: "Retardée - Rupture de stock" }
};

// 3. Déclaration des Outils (Ce que Copilot peut voir)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_customer_status",
        description: "Récupère le statut et l'état de la commande d'un client via son email.",
        inputSchema: {
          type: "object",
          properties: {
            email: { type: "string", description: "L'email du client (ex: dev@entreprise.com)" }
          },
          required: ["email"]
        }
      },
      {
        name: "update_customer_status",
        description: "Met à jour le statut d'un client via son email.",
        inputSchema: {
          type: "object",
          properties: {
            email: { type: "string", description: "L'email du client (ex: dev@entreprise.com)" },
            new_status: { type: "string", description: "Le nouveau statut du client (ex: 'VIP', 'Inactif', etc.)" }
          },
          required: ["email", "new_status"]
        }
      }
    ]
  };
});

// 4. Exécution de la logique (Ce que Copilot peut faire)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Logique pour 'get_customer_status'
  if (request.params.name === "get_customer_status") {
    const email = request.params.arguments.email;
    const data = DATABASE[email];

    if (!data) {
      return {
        content: [{ type: "text", text: `Erreur: Aucun client trouvé pour l'email ${email}` }],
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }

  // Logique pour 'update_customer_status'
  if (request.params.name === "update_customer_status") {
    const { email, new_status } = request.params.arguments;
    const data = DATABASE[email];

    if (!data) {
      return {
        content: [{ type: "text", text: `Erreur: Aucun client trouvé pour l'email ${email}` }],
        isError: true,
      };
    }

    // Mise à jour de la propriété status
    data.status = new_status;

    return {
      content: [
        {
          type: "text",
          text: `Succès : Le statut du client ${email} a été mis à jour avec la valeur "${new_status}".`
        }
      ]
    };
  }

  throw new Error("Outil inconnu");
});

// 5. Démarrage du serveur sur stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server démarré et en écoute sur stdio");
}

main().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});