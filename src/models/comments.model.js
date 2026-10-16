const pool = require("../config/db");

module.exports.grabAllcomments = async (id) => {
  const { rows } = pool.query(
    "select * from helpdesk_comments where author_id = $1 ",
    [id],
  );
  return rows;
};
