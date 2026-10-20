const { query } = require("express-validator");
const pool = require("../config/db");

module.exports.grabAlltickets = async () => {
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
module.exports.createTickets = async (ticketData) => {
  const { rows } = await pool.query(
    "insert into helpdesk_tickets (title, description, priority, customer_id) values ($1, $2, $3, $4) returning *",
    ticketData,
  );
  return rows[0];
};

module.exports.assignTicket = async (querydata) => {
  const { rows } = await pool.query(
    "update helpdesk_tickets set assigned_id = $1 where id =$2 returning title",
    querydata,
  );
  // console.log(rows);
  return rows[0];
};
module.exports.removeTicket = async (id) => {
  await pool.query("DELETE  FROM  helpdesk_tickets where id = $1 ", id);
  return true;
};
module.exports.pickOneById = async (ticketId) => {
  const { rows } = await pool.query(
    `SELECT * FROM helpdesk_tickets where id = $1`,
    ticketId,
  );
  // console.log(rows);
  return rows[0];
};

module.exports.updateStatues = async (params) => {
  const { status, id } = params;
  const { rows } = await pool.query(
    `update helpdesk_tickets set status = $1 ,updated_at= now() where id= $2  RETURNING *`,
    [status, id],
  );
  return rows[0];
};
