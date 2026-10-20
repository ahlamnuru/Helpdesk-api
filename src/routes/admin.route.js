const express = require("express");
const { requireRole } = require("../middlewares/auth");
const {
  roleValidators,
  passwordValidators,
  emailValidations,
  nameValidators,
} = require("../validators/register.validate");
const {
  adminregistration,
  decativateAccount,
  deleteAccount,
  getAllusers,
  getAllticketevents,
} = require("../controllers/admin.controller");

const adminRouter = express.Router();
adminRouter.use(requireRole("admin"));
adminRouter.post("/register", adminregistration);
adminRouter.post(
  "/agentregister",
  nameValidators,
  emailValidations,
  passwordValidators,
  roleValidators,
  adminregistration,
);
adminRouter.post("/:email/deactivate", decativateAccount);
adminRouter.get("/Allusers", getAllusers);
adminRouter.get("/ticket_events", getAllticketevents);
adminRouter.delete("/:email/deleteAccount", deleteAccount);
module.exports = adminRouter;
