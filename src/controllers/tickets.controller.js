const { grabMytickets } = require("../models/tickets.model");

module.exports.getMytickets = async (req, res, next) => {
  const user = req.user;
  try {
    const myTickets = await grabMytickets([user.id]);
    return res.json(myTickets);
  } catch (error) {
    next(error);
  }
};
