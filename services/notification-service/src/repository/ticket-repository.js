const { Op } = require("sequelize");

const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");

const { Enums } = require("../utils/index");
const { PENDING, FAILED } = Enums.STATUS_ENUMS;

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  /**
   * Fetches all tickets with status 'pending' or 'failed'
   * @returns {Promise<Array<Ticket>>}
   */
  async getPendingTickets() {
    const response = await Ticket.findAll({
      where: {
        status: {
          [Op.in]: [PENDING, FAILED],
        },
      },
    });
    return response;
  }

  /**
   * Updates the status of a ticket by id
   * @param {number} id - Ticket ID
   * @param {string} status - New status
   * @returns {Promise<[number, Ticket[]]>} - Number of affected rows
   */
  async updateStatus(id, status) {
    return await this.model.update(
      { status, updatedAt: new Date() },
      { where: { id } }
    );
  }
}
module.exports = TicketRepository;
