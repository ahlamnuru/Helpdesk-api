const express = require("express");
const { requireRole } = require("../middlewares/auth");
const {
  getMytickets,
  getAllTickets,
  createTicket,
  assignAgent,
} = require("../controllers/tickets.controller");
const ticketRouter = express.Router();

ticketRouter.get("/mine", requireRole("customer"), getMytickets);
ticketRouter.get("/all", requireRole("admin", "agent"), getAllTickets);
ticketRouter.post("/new", requireRole("customer"), createTicket);
ticketRouter.post("/:id/assingn", requireRole("admin", "agent"), assignAgent);
module.exports = ticketRouter;
