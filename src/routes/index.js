const { Router } = require("express");
const { authenticate } = require("../middlewares/auth");

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.get("/me", authenticate, (req, res) => res.json({ user: req.user }));

module.exports = router;
