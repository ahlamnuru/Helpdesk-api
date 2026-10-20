const pool = require("../config/db");

module.exports.findOne = async (email) => {
  const { rows } = await pool.query(
    "select * from helpdesk_users where email = $1",
    [email],
  );
  return rows[0];
};
module.exports.insertUser = async (user) => {
  const { rows } = await pool.query(
    "insert into helpdesk_users (fullname,email,password) values ($1,$2,$3) returning *",
    user,
  );
  return rows[0];
};
module.exports.insertagentfromAdmin = async (user) => {
  const { rows } = await pool.query(
    "insert into helpdesk_users (fullname,email,password,role) values ($1,$2,$3,$4) returning *",
    user,
  );
  return rows[0];
};
module.exports.deactivate = async (email, status) => {
  const { rows } = await pool.query(
    " update helpdesk_users set is_active =$1 where email = $2 returning is_active",
    [status, email],
  );
  return rows[0];
};
module.exports.removeAccount = async (email) => {
  await pool.query(`delete from helpdesk_users where email = $1`, [email]);
  return true;
};
module.exports.getAllhelpdeskusers = async () => {
  const { rows } = await pool.query(
    `select id, fullname , email , role, is_active  ,created_at from helpdesk_users`,
  );
  return rows;
};
