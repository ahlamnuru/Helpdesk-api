const { validationResult } = require("express-validator");
const {
  grabAlltickets,
  grabMytickets,
  createTickets,
  assignTicket,
  removeTicket,
  pickOneById,
} = require("../models/tickets.model");
const { attachComments } = require("../utils/attach.comments");
const { insertComment } = require("../models/comments.model");
const { canseeTckets } = require("../utils/cansee.tcikets");
const { TRANSITIONS } = require("../config/transition");

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
      if (!agentid || !ticketid) {
        return res
          .status(400)
          .json({ message: "Error the ticket id is required" });
      }
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
    const { ticket_id, body } = req.body;
    const user_id = req.user.id;
    const ticket = await insertComment([ticket_id, user_id, body]);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteTicket = async (req, res, next) => {
  try {
    const { ticketid } = req.body;
    if (!ticketid) {
      return res
        .status(400)
        .json({ message: "Error the ticket id is required" });
    }
    // else we can delete it
    const result = await removeTicket([ticketid]);
    res.json({ message: "Ticket removal status :" + result });
  } catch (error) {
    next(error);
  }
};
module.exports.changeStatus = async (req, res, next) => {
  try {
    // firsr let us chek if the currunt user is allwed to cnage some infor on currun ticket
    const { ticketid, newStatus } = req.body;

    const curruntTicket = await pickOneById(ticketid);

    const isAllowed = canseeTckets(req.user, curruntTicket);
    if (!isAllowed) {
      throw new Error("Error Ticket not found");
    }
    const isstastusallowed = TRANSITIONS[curruntTicket.status][newStatus];
    if (!isstastusallowed || !isstastusallowed.includes(req.user.role)) {
      throw new Error("Error Ticket cannot be cnahged  ");
    }
    // cnage sttaus loging using user model and also write the event data
  } catch (error) {
    next(error);
  }
};
