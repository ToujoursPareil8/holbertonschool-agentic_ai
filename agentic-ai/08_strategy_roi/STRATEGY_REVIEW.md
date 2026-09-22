# STRATEGY_REVIEW — Synthèse et recommandation finale

Ce document résume le travail réalisé (ROI, architecture, ADR) et donne une recommandation claire, sans reprendre les détails déjà présents dans les autres fichiers.

## 1. Ce que montre le calcul de ROI

Sur les trois tâches testées, l'approche agentic coûte environ 990 € contre 4 800 € en approche classique, soit **environ 3 810 € économisés (-79 %)**. Le temps humain nécessaire passe aussi de 88h à 17h. La plus grosse économie vient de la tâche la plus complexe (refactoring), ce qui suggère que le gain est d'autant plus grand que la tâche est répétitive ou lourde en volume, pas forcément sur les tâches courtes.

## 2. Ce que propose l'architecture (MegaShop-B2B)

Pour répondre aux trois contraintes du projet (panier rapide et résilient, historique légal inaltérable, paiement dépendant d'une banque lente), l'architecture sépare les responsabilités plutôt que de tout faire reposer sur une seule base de données :
- le panier passe par une mémoire rapide (Redis) pour tenir la latence,
- l'historique légal est écrit dans un stockage qu'on ne peut jamais modifier,
- le paiement est traité en arrière-plan pour ne pas bloquer le client pendant les 4 secondes de réponse bancaire.

## 3. Choix techniques majeurs retenus

- Redis pour le panier, PostgreSQL comme base principale.
- Un stockage à écriture unique (append-only) pour les logs d'audit, séparé de l'application.
- Un traitement asynchrone du paiement, avec une vérification pour éviter tout double débit.

## 4. Une proposition de l'IA que j'ai gardée

**Redis comme solution pour le panier.** C'est une réponse directe et standard à la contrainte de latence (< 50ms), sans invention inutile : Redis est fait pour ce genre d'usage, largement utilisé dans ce contexte, et le compromis (le panier peut être vieux de quelques secondes en cas de souci) est raisonnable comparé au risque de ralentir tout le site.

## 5. Une proposition de l'IA que j'ai remise en question

**L'ajout d'un vrai broker de messages (Kafka ou RabbitMQ) pour le paiement.** L'idée de ne pas bloquer le client pendant les 4 secondes de la banque est juste, mais déployer un broker complet pour gérer un seul flux asynchrone au démarrage du projet me semble disproportionné : ça ajoute un composant à maintenir, à surveiller et à sécuriser, pour un besoin qui pourrait être couvert au début par une simple table de tâches en attente dans PostgreSQL. Je proposerais de commencer simple, et de migrer vers un vrai broker seulement si le volume de commandes le justifie plus tard.

## 6. Compromis principaux de l'architecture

- **Coût** : plusieurs outils à faire tourner (PostgreSQL, Redis, stockage d'audit) au lieu d'un seul, donc plus de coût d'infrastructure et de maintenance.
- **Complexité** : chaque brique a sa propre logique de panne à gérer ; ce n'est pas "une seule base à surveiller".
- **Performance** : très bonne sur le panier, correcte partout ailleurs — aucune brique ne sacrifie la performance des autres.
- **Résilience** : bonne, car une panne sur un composant (ex. base principale) ne bloque pas les autres (ex. panier).
- **Sécurité/légal** : point fort de cette architecture, car l'historique est protégé même contre un accès interne mal intentionné.

## 7. Conclusion et recommandation

Je recommanderais cette approche à une entreprise qui a un vrai besoin de disponibilité et de trafic important, comme c'est le cas ici (50 000 utilisateurs en simultané). Le coût de complexité supplémentaire se justifie parce qu'il répond à des contraintes réelles du projet, pas à des effets de mode.

En revanche, je ne la recommanderais pas telle quelle à une petite structure avec peu de trafic et pas d'obligation légale forte sur les logs : dans ce cas, une architecture plus simple (une seule base de données bien dimensionnée) suffirait, et cette proposition serait du sur-dimensionnement.