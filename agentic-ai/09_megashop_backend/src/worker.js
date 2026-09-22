require('dotenv').config();

const OpenAI = require('openai');
const { Langfuse, observeOpenAI } = require('langfuse');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline/promises');
const {
  PAYMENT_QUEUE,
  createQueueClient,
  connectWithRetry,
} = require('./redis');

const redisClient = createQueueClient('worker');
const langfuse = new Langfuse();
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

/**
 * Une seule trace Langfuse par paiement traité, réutilisée pour
 * l'analyse LLM ET pour le score de décision HITL.
 */
function getPaymentTrace(payment) {
  return langfuse.trace({
    id: `payment-${payment.paymentId}`, // id déterministe : même trace retrouvée partout
    name: 'megashop.payment.processing',
    metadata: {
      transactionId: payment.paymentId,
      eventId: payment.eventId,
    },
  });
}

async function analyzePayment(payment, trace) {
  const tracedOpenAIClient = observeOpenAI(openai, {
    parent: trace, // rattache la génération LLM à la trace du paiement
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

async function requestRefundApproval(payment, trace) {
  const prompt = [
    '\n[GOVERNANCE - HITL] A refund is waiting for human approval.',
    `Transaction ${payment.paymentId} (${payment.amount} ${payment.currency}).`,
    'Confirm this refund? (o/n): ',
  ].join('\n');
  const rl = readline.createInterface({ input, output });

  try {
    const answer = await rl.question(prompt);
    const approved = answer.trim().toLowerCase() === 'o';

    // Score rattaché à la trace du traitement de CE paiement, pas à une trace séparée
    trace.score({
      name: 'human-refund-approval',
      value: approved ? 1 : 0,
      dataType: 'NUMERIC',
    });
    trace.update({ metadata: { decision: approved ? 'approved' : 'rejected' } });
    await langfuse.flushAsync();

    return approved;
  } finally {
    rl.close();
  }
}

async function processPayment(payment) {
  const trace = getPaymentTrace(payment);

  if (payment.status === 'refunded' && !(await requestRefundApproval(payment, trace))) {
    console.log('Refund rejected by operator', { paymentId: payment.paymentId });
    return false;
  }

  await analyzePayment(payment, trace);
  return true;
}

async function runWorker() {
  await connectWithRetry(redisClient);
  console.log(`Payment worker listening on ${PAYMENT_QUEUE}`);

  while (true) {
    try {
      const item = await redisClient.brPop(PAYMENT_QUEUE, 0);
      const payment = JSON.parse(item.element);
      await processPayment(payment);
    } catch (error) {
      console.error('Payment worker processing failed', error.message);
      await connectWithRetry(redisClient);
    }
  }
}

async function shutdown(signal) {
  console.log(`Worker received ${signal}, shutting down`);
  try {
    await langfuse.shutdownAsync();
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

module.exports = { analyzePayment, processPayment, requestRefundApproval, runWorker };