// Simulation très basique d'un connecteur de base de données
const db = {
    query: (sql, parameters) => {
        console.log(`[DB ENGINE] Exécution de la requête : ${sql}`);
        
        if (
            sql === 'SELECT * FROM users WHERE email = $1 AND password = $2' &&
            parameters[0] === 'dev@entreprise.com' &&
            parameters[1] === 'password123'
        ) {
            return [{ id: 1, role: 'admin', email: 'dev@entreprise.com' }];
        }
        return [];
    }
};

/**
 * Fonction d'authentification legacy (VULNÉRABLE)
 * À refactoriser par l'IA en mode Agent (Edits)
 */
function authenticateUser(email, password) {
    const sql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const parameters = [email, password];
    
    const results = db.query(sql, parameters);

    if (results.length > 0) {
        return { success: true, user: results[0] };
    }
    return { success: false, message: "Identifiants invalides" };
}

module.exports = { authenticateUser };