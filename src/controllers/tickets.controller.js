const { validationResult } = require("express-validator");
const {
  grabAlltickets,
  grabMytickets,
  createTickets,
  assignTicket,
} = require("../models/tickets.model");
const { attachComments, writeComment } = require("../utils/attach.comments");

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

module.exports.createTicket = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }
    const { title, description, priority } = req.body;
    const customer_id = req.user.id;
    const ticket = await createTickets([
      title,
      description,
      priority,
      customer_id,
    ]);
    return res.json(ticket);
  } catch (err) {
    next(err);
  }
};

module.exports.assignAgent = async (req, res, next) => {
  const user = req.user;
  let result = "";
  try {
    if (user.role === "admin") {
      const { agentid, ticketid } = req.body;
      result = await assignTicket([agentid, ticketid]);
    } else {
      // is we are assing self
      const { id } = req.params;

      result = await assignTicket([user.id, id]);
    }
    res.json({
      message: `agnet  have been assinged to the  task ${result.title}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.writeComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }
    const {ticket_id, body} = req.body;
    const user_id = req.user.id;
    const ticket = await writeComment([ticket_id, user_id, body]);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};
