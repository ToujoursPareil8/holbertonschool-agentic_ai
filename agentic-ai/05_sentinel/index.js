import 'dotenv/config';

// 1. Validation de la présence du token
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("Erreur : Le jeton GITHUB_TOKEN n'est pas défini dans le fichier .env");
  process.exit(1);
}

// 2. Fonction de récupération des issues via l'API GitHub
async function fetchRepoIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Sentinel-App'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const issues = await response.json();
    
    // Filtrer pour exclure les Pull Requests (l'API GitHub inclut les PRs dans les issues)
    const pureIssues = issues.filter(issue => !issue.pull_request);
    
    return pureIssues;

  } catch (error) {
    console.error("Échec de la récupération des issues :", error.message);
    return [];
  }
}

// 3. Exemple de test direct
async function main() {
  console.log("Recherche des issues en cours...");
  const issues = await fetchRepoIssues('holbertonschool', 'holbertonschool-agentic_ai');
  console.log(`Nombre d'issues trouvées : ${issues.length}`);
  console.log(issues);
}

main();