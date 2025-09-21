const express = require("express");
const amqplib = require("amqplib");

const { startEmailCron } = require("./services/email-service");
const { TicketRepository } = require("./repository/index");
const logger = require("./config/logger-config");
const { serverConfig, queueConfig } = require("./config/index");
const apiRoutes = require("./routes/index");
const { Enums } = require("./utils/index");
const { PENDING } = Enums.STATUS_ENUMS;

const ticketRepository = new TicketRepository();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware BEFORE mounting API routes
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const safeBody = JSON.parse(JSON.stringify(req.body));

    if (safeBody.password) {
      safeBody.password = "***";
    }

    logger.info(`Request Body: ${JSON.stringify(safeBody)}`);
  } else {
    logger.info(`Query Params: ${JSON.stringify(req.query)}`);
  }

  next();
});

app.use("/api", apiRoutes);

async function start() {
  try {
    await queueConfig.connectQueue();
    logger.info("Queue connected");

    // Start consuming messages from the booking service
    await queueConfig.consumeQueue(async (msg) => {
      logger.info("Received booking notification:", msg);

      const {
        bookingId,
        userId,
        userEmail,
        flightId,
        seats,
        totalCost,
        timestamp,
      } = msg;

      try {
        // Create a ticket in DB with status 'pending'
        const ticketData = {
          subject: `Booking Confirmation #${bookingId}`,
          content: `Your booking for flight ${flightId} with ${seats} seat(s) totaling $${totalCost} was successfully created on ${timestamp}.`,
          recepientEmail: userEmail,
          status: PENDING,
        };

        await ticketRepository.create(ticketData);

        logger.info(
          `Ticket created for bookingId ${bookingId} and email ${userEmail}`
        );
      } catch (error) {
        logger.error(
          "Failed to create ticket for booking notification:",
          error
        );
      }
    });

    app.listen(serverConfig.PORT, () => {
      logger.info(`Server started on port ${serverConfig.PORT}`);

      // start the email sending cron job
      startEmailCron();
    });
  } catch (error) {
    logger.error("Failed to start service:", error);
    process.exit(1);
  }
}

start();
