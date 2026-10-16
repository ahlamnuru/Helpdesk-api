const pool = require("../config/db");

module.exports.grabAllcomments = async (id) => {
  const { rows } = await pool.query(
    "select * from helpdesk_comments where ticket_id = $1 ",
    [id],
  );
  return rows;
};
module.exports.writeComment = async(comment) => {
  const {rows} = await pool.query(
    "insert into helpdesk_comments (ticket_id, user_id, body) values ($1,$2,$3) returning *",
    comment
  );
  return rows[0];
}