const pool = require("../config/db");

module.exports.insertEventData = async (datas) => {
  const { ticketId, userId, userRole, fromStatus, toStatus } = datas;
  const { rows } = await pool.query(
    `INSERT INTO ticket_status (ticket_id, user_id, user_role, from_status, to_status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [ticketId, userId, userRole, fromStatus, toStatus],
  );
  return rows[0];
};
