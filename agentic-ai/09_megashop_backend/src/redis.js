const { createClient } = require('redis');

const PAYMENT_QUEUE = process.env.REDIS_QUEUE || 'megashop:payment-notifications';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

function createQueueClient(serviceName) {
  const client = createClient({ url: redisUrl });

  client.on('error', (error) => {
    console.error(`Redis ${serviceName} asynchronous error`, error.message);
  });
  client.on('reconnecting', (delay) => {
    console.warn(`Redis ${serviceName} reconnecting`, delay);
  });
  client.on('end', () => {
    console.warn(`Redis ${serviceName} connection closed`);
  });

  return client;
}

async function connectWithRetry(client) {
  let delay = 500;

  while (!client.isReady) {
    try {
      if (!client.isOpen) {
        await client.connect();
      }
      return client;
    } catch (error) {
      console.error('Redis connection attempt failed', error.message);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, 5000);
    }
  }

  return client;
}

async function enqueuePayment(client, payment) {
  await connectWithRetry(client);
  await client.lPush(PAYMENT_QUEUE, JSON.stringify(payment));
}

module.exports = { PAYMENT_QUEUE, createQueueClient, connectWithRetry, enqueuePayment };