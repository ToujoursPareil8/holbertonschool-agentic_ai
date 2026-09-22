# MegaShop Payment Webhook

Webhook Node.js / Express recevant les notifications de paiement bancaire. Le contrat complet se trouve dans [specifications.md](specifications.md).

## Lancer localement

```bash
npm ci
npm start
```

Le service écoute sur `http://localhost:3000` par défaut. Le port peut être changé avec `PORT`.

## Exemple de requête

```bash
curl -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{"eventId":"evt-1","paymentId":"pay-1","status":"paid","amount":125.50,"currency":"EUR","occurredAt":"2026-09-18T12:00:00Z"}'
```

La réponse est `200 OK` avec `{ "received": true }`. La trace est écrite dans la console après l'envoi de la réponse.

## Docker

```bash
docker build -t megashop-payment-webhook .
docker run --rm -p 3000:3000 megashop-payment-webhook
```

Le conteneur utilise l'utilisateur non privilégié `node`.