module.exports.TRANSITIONS = {
  open: { in_progress: ["agent", "admin"] },
  in_progress: { resolved: ["agent", "admin"], open: ["agent", "admin"] },
  resolved: {
    closed: ["customer", "admin"],
    open: ["customer", "agent", "admin"],
  },
  closed: {},
};
