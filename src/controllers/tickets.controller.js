const { grabAlltickets } = require("../models/tickets.model");

module.exports.getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await grabAlltickets();
    res.json({ allTickets });
  } catch (error) {
    next(error);
  }
};
