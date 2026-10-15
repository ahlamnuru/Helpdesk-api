const pool = require("../config/db");

module.exports.grabAlltickets = async (params) => {
  const { rows } = await pool.query("select * from helpdesk_tickets");
  return rows;
};
