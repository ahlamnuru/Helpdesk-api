const { Router } = require("express");
const { authenticate } = require("../middlewares/auth");
const authRouter = require("./auth.route");
const ticketRouter = require("./tickets.routes");

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.get("/me", authenticate, (req, res) => res.json({ user: req.user }));
router.use("/auth", authRouter);
router.use(authenticate);
router.use("/tickets", ticketRouter);
router.use("/agents", agentRouter);
router.use("/admin", adminRouter);
module.exports = router;
