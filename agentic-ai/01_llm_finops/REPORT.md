demande tech : Écris un script pour scraper une page web et sauvegarder les données, en gérant les erreurs

models : ChatGPT-5.6 Luna
         Claude Sonnet 5

dif observées:

GPT écrut un script générique léger (70 lignes), non commenté, avec 2 fonctions scraper et sauvegarder pas de main explicite. Il suppose que le site a une structure précise. Ne fait aucun retry réseau donc requete échouée = abandon.

Claude écrit un script plus lourd (193 lignes), commenté, plus modulaire : il crée des exception customisée, séparation de fetch/parse/save/ochestrate et fonction main(). Effectue 3 retry  réseau avec backoff.

choix arbitraires et pb : les langages utilisés sont choisi arbitrairement et