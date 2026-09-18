const OpenAI = require('openai');
const { observeOpenAI } = require('langfuse');
const {
  PAYMENT_QUEUE,
  createQueueClient,
  connectWithRetry,
} = require('./redis');

const redisClient = createQueueClient('worker');
let tracedOpenAIClient;
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

async function analyzePayment(payment) {
  tracedOpenAIClient = observeOpenAI(openai, {
    traceName: 'megashop.payment.analysis',
    generationName: 'payment-transaction-analysis',
    metadata: {
      transactionId: payment.paymentId,
      eventId: payment.eventId,
    },
  });

  try {
    const completion = await tracedOpenAIClient.chat.completions.create({
      model: process.env.GEMINI_MODEL || 'gemini-3.6',
      messages: [
        {
          role: 'system',
          content: 'Analyze the payment notification and return a concise risk and reconciliation assessment.',
        },
        {
          role: 'user',
          content: JSON.stringify(payment),
        },
      ],
    });

    console.log('Payment analysis completed', {
      paymentId: payment.paymentId,
      analysis: completion.choices[0]?.message?.content || '',
    });
  } finally {
    await tracedOpenAIClient.flushAsync();
  }
}

async function runWorker() {
  await connectWithRetry(redisClient);
  console.log(`Payment worker listening on ${PAYMENT_QUEUE}`);

  while (true) {
    try {
      const item = await redisClient.brPop(PAYMENT_QUEUE, 0);
      const payment = JSON.parse(item.element);
      await analyzePayment(payment);
    } catch (error) {
      console.error('Payment worker processing failed', error.message);
      await connectWithRetry(redisClient);
    }
  }
}

async function shutdown(signal) {
  console.log(`Worker received ${signal}, shutting down`);
  try {
    if (tracedOpenAIClient) {
      await tracedOpenAIClient.shutdownAsync();
    }
    await redisClient.quit();
  } catch (error) {
    console.error('Redis worker shutdown failed', error.message);
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (error) => {
  console.error('Worker unhandled rejection', error.message);
});

if (require.main === module) {
  runWorker().catch((error) => {
    console.error('Worker stopped unexpectedly', error.message);
    process.exitCode = 1;
  });
}

module.exports = { analyzePayment, runWorker };