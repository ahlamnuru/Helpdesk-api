const { grabAlltickets, grabMytickets } = require("../models/tickets.model");

module.exports.getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await grabAlltickets();
    res.json({ allTickets });
  } catch (error) {
    next(error);
  }
};

module.exports.getMytickets = async (req, res, next) => {
  const user = req.user;
  try {
    const myTickets = await grabMytickets([user.id]);
    return res.json(myTickets);
  } catch (error) {
    next(error);
  }
};
