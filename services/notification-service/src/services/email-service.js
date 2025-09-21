const { StatusCodes } = require("http-status-codes");

const { TicketRepository } = require("../repository/index");
const { emailConfig, logger } = require("../config/index");
const { AppError } = require("../utils/index");

const ticketRepository = new TicketRepository();

/**
 * Creates a support ticket and returns the saved record.
 *
 * @param {Object} data - Ticket data (subject, description, email, etc.)
 * @returns {Promise<Object>} Created ticket
 */
async function createTicket(data) {
  try {
    const ticket = await ticketRepository.create(data);
    logger.info(`Ticket created with ID: ${ticket.id}`);
    return ticket;
  } catch (error) {
    logger.error("Error creating ticket:", error);

    if (error instanceof AppError) throw error;

    throw new AppError(
      "Failed to create ticket",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * Send an email with optional HTML content.
 *
 * @param {string} mailFrom - Sender email address
 * @param {string} mailTo - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string|null} html - HTML body (optional)
 *
 * @returns {Promise} resolves with nodemailer response if successful
 */
async function sendEmail(mailFrom, mailTo, subject, text, html = null) {
  try {
    const mailOptions = {
      from: mailFrom,
      to: mailTo,
      subject,
      text,
    };
    if (html) {
      mailOptions.html = html;
    }

    const response = await emailConfig.sendMail(mailOptions);
    logger.info(`Email sent to ${mailTo}: ${response.response}`);

    return response;
  } catch (error) {
    if (error.code === "EAUTH") {
      logger.warn("Authentication failed while sending email:", error.message);
      throw new AppError(
        "Email authentication failed",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (["ECONNECTION", "ETIMEDOUT", "ESOCKET"].includes(error.code)) {
      logger.warn("Network error while sending email:", error.message);
      throw new AppError(
        "Unable to connect to email server",
        StatusCodes.SERVICE_UNAVAILABLE
      );
    }

    logger.error("Unexpected error occurred while sending email:", error);
    throw new AppError(
      "An unexpected error occurred while sending the email",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * Fetches tickets with "PENDING" status.
 *
 * @param {Object} options - Filter options
 * @returns {Promise<Array>} List of pending tickets
 */
async function getPendingTickets() {
  try {
    const response = await ticketRepository.getPendingTickets();
    return response;
  } catch (error) {
    logger.error("Error fetching pending tickets:", error);
    throw new AppError(
      "Could not retrieve pending tickets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createTicket,
  sendEmail,
  getPendingTickets,
};
