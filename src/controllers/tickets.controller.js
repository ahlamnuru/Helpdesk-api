const { grabAlltickets, grabMytickets } = require("../models/tickets.model");
const { attachComments } = require("../utils/attach.comments");

module.exports.getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await grabAlltickets();
    // attach commets for each ticket
    const helpdesk_Tickets = await attachComments(allTickets);
    res.json({ helpdesk_Tickets });
  } catch (error) {
    next(error);
  }
};

module.exports.getMytickets = async (req, res, next) => {
  const user = req.user;
  try {
    const myTickets = await grabMytickets([user.id]);
    // attach commets for each ticket
    const helpdesk_Tickets = await attachComments(myTickets);
    return res.json(helpdesk_Tickets);
  } catch (error) {
    next(error);
  }
};
