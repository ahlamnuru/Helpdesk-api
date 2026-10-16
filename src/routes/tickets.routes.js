const express = require("express");
const { requireRole } = require("../middlewares/auth");
const {
  getMytickets,
  getAllTickets,
  createTicket,
} = require("../controllers/tickets.controller");
const ticketRouter = express.Router();

ticketRouter.get("/mine", requireRole("member"), getMytickets);
ticketRouter.get("/all", requireRole("admin", "agent"), getAllTickets);
ticketRouter.post("/new", requireRole("member"), createTicket);

module.exports = ticketRouter;
