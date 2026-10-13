const passport = require("../config/passport");

// Use on any route that needs a logged-in user: router.get("/x", authenticate, handler)
const authenticate = passport.authenticate("jwt", { session: false });

// Use after authenticate: router.delete("/x", authenticate, requireRole("admin"), handler)
const requireRole = (...roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) return next();
  res.status(403).json({ error: "Forbidden" });
};

module.exports = { authenticate, requireRole };
