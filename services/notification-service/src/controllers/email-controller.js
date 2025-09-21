const { StatusCodes } = require("http-status-codes");

const { EmailService } = require("../services/index");
const { ErrorResponse, SuccessResponse, AppError } = require("../utils/index");
const { logger } = require("../config/index");

/**
 * POST /tickets
 *
 * Expected request body (JSON):
 * {
 *   subject: "Issue subject",
 *   content: "Detailed description",
 *   email: "user@example.com",
 * }
 *
 * Creates a new support ticket.
 */
async function createTicketController(req, res) {
  try {
    const { subject, content, recepientEmail } = req.body;

    if (!subject || !content || !recepientEmail) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        ErrorResponse({
          message: "Subject, content, and recepientEmail are required fields",
        })
      );
    }

    const ticketData = { subject, content, recepientEmail };

    const ticket = await EmailService.createTicket(ticketData);

    return res.status(StatusCodes.CREATED).json(
      SuccessResponse({
        message: "Ticket created successfully",
        data: ticket,
      })
    );
  } catch (error) {
    logger.error("Ticket creation failed at controller layer", {
      error: error.message,
    });

    if (error instanceof AppError) {
      return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(
        ErrorResponse({
          message: error.message,
        })
      );
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorResponse({
        message: "Something went wrong while creating the ticket",
        error: error.message,
      })
    );
  }
}

module.exports = {
  createTicketController,
};
