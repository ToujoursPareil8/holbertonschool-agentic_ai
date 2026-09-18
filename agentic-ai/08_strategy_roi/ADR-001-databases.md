# ADR-001 : Choix des solutions de stockage


## Contexte
Le projet MegaShop-B2B (voir `contexte-business.md`) doit gérer trois besoins particuliers :
1. Le panier d'achat doit répondre très vite (< 50ms) et continuer à marcher même si la base de données principale tombe en panne.
2. Toutes les actions doivent être enregistrées dans un historique qu'on ne peut jamais modifier (obligation légale).
3. Le paiement passe par une banque dont la réponse est lente (environ 4 secondes).

Une seule base de données ne peut pas répondre correctement à ces trois besoins en même temps. On choisit donc plusieurs outils de stockage, chacun adapté à un besoin précis.

## Décision

### 1. Panier d'achat → Redis
Redis est une base qui stocke les données en mémoire, donc très rapide. Le panier est lu et écrit dans Redis en priorité. Une copie est envoyée un peu plus tard vers la base principale (PostgreSQL), pour ne pas ralentir le client.
Si la base principale tombe en panne, ce n'est pas grave : le panier continue de fonctionner car il ne dépend pas d'elle.
Si c'est Redis qui tombe en panne, le site passe en mode réduit : le client voit le dernier panier connu, et les nouvelles actions sont mises en attente pour être reprises dès que Redis revient.

### 2. Données principales (comptes, commandes, catalogue) → PostgreSQL
PostgreSQL est une base de données classique et fiable, utilisée pour tout ce qui doit rester cohérent (prix, stock, contrats). Rien dans le projet ne justifie d'utiliser autre chose ici.

### 3. Historique des actions (audit) → stockage à écriture unique
On ne met pas ces informations dans PostgreSQL, car une donnée dans une base classique peut toujours être modifiée par quelqu'un ayant les bons droits d'accès. Or la loi demande un historique impossible à changer.
On utilise donc un système où chaque nouvelle entrée est ajoutée mais jamais modifiée ni supprimée (par exemple un stockage type "S3 Object Lock" ou "Azure Immutable Blob"). Chaque entrée est aussi reliée mathématiquement à la précédente (un "hash"), ce qui permet de détecter immédiatement si quelqu'un essaie de trafiquer une ancienne entrée.
Si ce stockage tombe en panne, les informations ne sont pas perdues : elles attendent dans une file avant d'être enregistrées. Si une entrée manque, on ne l'invente pas et on ne l'ignore pas : on prévient qu'il y a un problème.

### 4. Suivi des paiements → file d'attente + vérification anti-doublon
Comme la banque met 4 secondes à répondre, on ne fait pas attendre le client sur cette page. La commande est acceptée tout de suite avec un statut "en cours", et le paiement est traité un peu après, en arrière-plan, via une file d'attente (par exemple RabbitMQ ou Kafka). Le client est prévenu une fois le paiement terminé.
On garde aussi en mémoire un identifiant unique par paiement, pour être sûr de ne jamais débiter deux fois la même commande, même si le système réessaie automatiquement en cas de souci.

## Conséquences

**Avantages**
- Chaque besoin a sa propre solution : une panne sur un point ne bloque pas les autres.
- Le panier reste utilisable même si la base principale a un problème.
- L'historique légal est vraiment protégé, pas seulement "en théorie".

**Inconvénients acceptés**
- Il faut gérer plusieurs outils différents (PostgreSQL, Redis, stockage d'audit) au lieu d'un seul, ce qui demande plus de travail de maintenance.
- Il peut arriver que le panier affiché soit vieux de quelques secondes si Redis vient de tomber — on accepte ce petit risque pour garder le site rapide et disponible.
- Le stockage de l'historique grossit sans jamais pouvoir être nettoyé, car la loi l'exige.

## Solutions écartées
- **Tout mettre dans PostgreSQL, panier compris** : trop lent pour tenir les 50ms avec beaucoup d'utilisateurs, et tout serait bloqué si cette base tombe en panne.
- **Utiliser MongoDB pour le catalogue** : rien dans le projet ne le justifie ; ce serait ajouter un outil en plus sans vraie raison.
- **Historique dans PostgreSQL avec des règles de protection (triggers)** : ne suffit pas légalement, car une personne avec les bons droits pourrait quand même modifier les données.