const passport = require("../config/passport");
const { cookieOptions } = require("../utils/token");

// Use on any route that needs a logged-in user: router.get("/x", authenticate, handler)
const authenticate = passport.authenticate("jwt", { session: false });

// Use after authenticate: router.delete("/x", authenticate, requireRole("admin"), handler)
const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) return next();
    res.status(403).json({ error: "Forbidden" });
  };
const logOut = async (req, res, next) => {
  try {
    res.clearCookie("token", cookieOptions);
    res.json({ message: "Loged out sucussfully", user: req.user || [] });
  } catch (error) {
    next(error);
  }
};
module.exports = { authenticate, requireRole, logOut };
