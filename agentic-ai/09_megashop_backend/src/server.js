const express = require('express');
const { createQueueClient, connectWithRetry, enqueuePayment } = require('./redis');

const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);
const maximumBodySize = '100kb';
const redisClient = createQueueClient('app');

app.disable('x-powered-by');
app.use(express.json({ limit: maximumBodySize, strict: true }));

function isValidPaymentNotification(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return false;
  }

  const requiredFields = ['eventId', 'paymentId', 'status', 'amount', 'currency', 'occurredAt'];
  if (requiredFields.some((field) => !(field in payload))) {
    return false;
  }

  const identifiersAreValid = ['eventId', 'paymentId'].every(
    (field) => typeof payload[field] === 'string' && payload[field].length > 0 && payload[field].length <= 128,
  );
  const occurredAtIsValid = typeof payload.occurredAt === 'string'
    && !Number.isNaN(Date.parse(payload.occurredAt));

  return identifiersAreValid
    && ['paid', 'failed', 'refunded'].includes(payload.status)
    && typeof payload.amount === 'number'
    && Number.isFinite(payload.amount)
    && payload.amount >= 0
    && typeof payload.currency === 'string'
    && /^[A-Z]{3}$/.test(payload.currency)
    && occurredAtIsValid;
}

app.post('/webhook/payment', (request, response) => {
  if (!isValidPaymentNotification(request.body)) {
    return response.status(400).json({ error: 'Invalid payment notification' });
  }

  response.status(200).json({ received: true });

  setImmediate(() => {
    enqueuePayment(redisClient, request.body)
      .then(() => console.log('Payment notification queued', request.body.eventId))
      .catch((error) => console.error('Payment notification queueing failed', error.message));
  });
});

app.use((error, request, response, next) => {
  if (error.type === 'entity.too.large') {
    return response.status(413).json({ error: 'Payload too large' });
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'Invalid JSON payload' });
  }

  console.error('Unhandled request error', error.message);
  return response.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  connectWithRetry(redisClient).catch((error) => {
    console.error('Redis initial connection failed', error.message);
  });

  app.listen(port, () => {
    console.log(`Payment webhook listening on port ${port}`);
  });
}

module.exports = { app, isValidPaymentNotification };