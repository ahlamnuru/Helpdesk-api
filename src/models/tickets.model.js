const pool = require("../config/db");

module.exports.grabAlltickets = async (params) => {
  const { rows } = await pool.query("select * from helpdesk_tickets");
  return rows;
};

module.exports.grabMytickets = async (id) => {
  const { rows } = await pool.query(
    "select * from helpdesk_tickets where customer_id = $1",
    id,
  );
  return rows;
};
