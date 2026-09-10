# Documentation de l'outil d'enregistrement (Update Tool)

## 1. Nom du Tool ajouté
- `update_customer_status`

## 2. Paramètres transmis lors du test
- **email** : `dev@entreprise.com`
- **new_status** : `Inactif`

## 3. Résultat retourné par le Tool
- **Confirmation de mise à jour** : Le statut du client a été modifié avec succès vers `Inactif`.
- **Lecture de vérification (`get_customer_status`)** :
  ```json
  {
    "id": 101,
    "status": "Inactif",
    "order_status": "Livrée"
  }