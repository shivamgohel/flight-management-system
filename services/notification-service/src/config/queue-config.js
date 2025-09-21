const amqplib = require("amqplib");
const logger = require("./logger-config");

let connection = null;
let channel = null;

const QUEUE_NAME = "noti-queue";

/**
 * Connects to RabbitMQ server, creates channel, and asserts queue
 * @param {string} queueName - Queue name to assert (default: 'noti-queue')
 */
async function connectQueue(queueName = QUEUE_NAME) {
  try {
    if (connection && channel) {
      logger.info("✅ RabbitMQ already connected");
      return;
    }

    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, {
      durable: true, // queue survives broker restarts
    });

    logger.info(`✅ Connected to RabbitMQ and asserted queue: ${queueName}`);

    // Optional: handle connection close/errors
    connection.on("error", (err) => {
      logger.error("RabbitMQ connection error:", err);
      connection = null;
      channel = null;
    });
    connection.on("close", () => {
      logger.warn("RabbitMQ connection closed");
      connection = null;
      channel = null;
    });
  } catch (error) {
    logger.error("❌ Failed to connect to RabbitMQ:", error);
    throw error;
  }
}

/**
 * Sends data/message to a RabbitMQ queue
 * @param {Object} data - Data object to send
 * @param {string} queueName - Queue name (default: 'noti-queue')
 */
async function sendData(data, queueName = QUEUE_NAME) {
  try {
    if (!channel) {
      throw new Error(
        "RabbitMQ channel not established. Call connectQueue first."
      );
    }

    const sent = channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(data)),
      { persistent: true } // message persists if broker restarts
    );

    if (sent) {
      logger.info(
        `📤 Message sent to queue ${queueName}: ${JSON.stringify(data)}`
      );
    } else {
      logger.warn(
        `⚠️ Message was NOT sent to queue ${queueName}: ${JSON.stringify(data)}`
      );
    }
  } catch (error) {
    logger.error("❌ Failed to send message to queue:", error);
    throw error;
  }
}

/**
 * Consume messages from a queue with a given message handler
 * @param {(msg) => Promise<void>} messageHandler - Async function to process each message
 * @param {string} queueName - Queue name (default: 'noti-queue')
 */
async function consumeQueue(messageHandler, queueName = QUEUE_NAME) {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel not initialized. Call connectQueue() first."
    );
  }

  await channel.consume(
    queueName,
    async (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());
          await messageHandler(content);
          channel.ack(msg);
          logger.info(
            `✅ Message processed and acknowledged from queue: ${queueName}`
          );
        } catch (error) {
          logger.error("❌ Error processing message:", error);
          // Optionally nack with requeue or not, here no requeue to avoid loops
          channel.nack(msg, false, false);
        }
      }
    },
    { noAck: false }
  );

  logger.info(`👂 Started consuming messages from queue: ${queueName}`);
}

/**
 * Get current channel (if needed for custom operations)
 */
function getChannel() {
  return channel;
}

/**
 * Get current connection (if needed for custom operations)
 */
function getConnection() {
  return connection;
}

async function closeQueue() {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    logger.info("✅ RabbitMQ connection and channel closed gracefully");
  } catch (error) {
    logger.error("❌ Error during RabbitMQ close:", error);
  }
}

module.exports = {
  connectQueue,
  sendData,
  consumeQueue,
  getChannel,
  getConnection,
  closeQueue,
};
