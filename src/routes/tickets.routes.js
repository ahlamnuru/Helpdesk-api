const express = require('express');
const { requireRole } = require('../middlewares/auth');
const { getMytickets } = require('../controllers/tickets.controller');
const ticketRouter = express.Router();


ticketRouter.get('/mine',requireRole("member"),getMytickets);

ticketRouter.post('/new',requireRole("member"), ticketController.createTicket);

module.exports = ticketRouter;