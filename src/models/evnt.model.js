module.exports.insertEventData = async (...datas) => {
  const { rows } = await pool.query(
    "insert into helpdesk_events (ticket_id, actor_id, type ,from_value, to_value) values ($1,$2,'status_changed',$3,$4) returning *",
    datas,
  );
  return rows[0];
};
