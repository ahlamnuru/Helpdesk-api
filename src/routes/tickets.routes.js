//1 get my tickets belong to the user
//2 tickets/all /my

//founded 1 ticket ... grab aslo the comments belogn to this ticket .commnets json send to clinet

const express = require("express");
const { requireRole, authenticate } = require("../middlewares/auth");
const ticketRouter = express.Router();

// cretae conroler funtion that retrives all ticckets
// then send them to the clinet

ticketRouter.get("/all", requireRole("admin", "agent"), getAllTickets);

module.exports = ticketRouter;
