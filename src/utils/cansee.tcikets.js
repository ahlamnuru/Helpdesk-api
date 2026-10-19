module.exports.canseeTckets = async (user, ticket) => {
  if (user.role === "admin") return true;

  return user.id === ticket.assigned_id || user.id === ticket.customer_id;
};
