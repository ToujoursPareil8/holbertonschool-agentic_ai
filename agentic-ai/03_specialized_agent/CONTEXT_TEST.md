le résultat reste le meme, il est correct avant et après le crash test :
`Chaque bloc it() ou test() doit être nommé en anglais selon ce format exact :should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`

# Le Crash Test (Saturation de l'attention)
## Objectif

L'objectif de cette étape est d'évaluer la robustesse de la fenêtre de contexte de l'agent en provoquant une saturation de l'historique de discussion, afin d'observer d'éventuels oublis, approximations ou hallucinations.

### Procédure Suivie

**Saturation de l'historique :**

    Conservation de la session de chat ayant servi à la génération des tests.

    Envoi successif de plusieurs longs blocs de texte non pertinents (spam/Lorem Ipsum) afin de surcharger le contexte.

**Test de rappel dans le chat saturé :**

    Soumission de la question : "Au fait, rappelle-moi la règle de nommage exacte de nos tests selon nos guidelines d'entreprise ?"

    Observation et enregistrement de la réponse obtenue.

**Réinitialisation et test à froid :**

    Ouverture d'une nouvelle session de chat (purge du contexte).

    Réinitialisation de l'Agent à partir de la mémoire du projet.

    Soumission de la même question sur la règle de nommage.

### Résultats Observés

**Réponse obtenue avant la purge (contexte saturé)**

`Chaque bloc it() ou test() doit être nommé en anglais selon ce format exact : should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`

**Réponse obtenue après la réinitialisation (nouveau chat)**

`Chaque bloc it() ou test() doit être nommé en anglais selon ce format exact : should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`

### Constat Comparative

Le résultat reste rigoureusement identique et correct avant et après le crash test. Malgré la saturation de la fenêtre de contexte avec du texte parasite, l'agent a su conserver et restituer précisément la convention de nommage should_[EXPECTED_BEHAVIOR]_when_[CONDITION] sans hallucination ni dégradation.