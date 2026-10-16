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
  const {rows} = await pool.query(
    "insert into helpdesk_users (fullname,email,password,role) values ($1,$2,$3,$4) returning *",
    user
  );
  return rows[0]; 
}
