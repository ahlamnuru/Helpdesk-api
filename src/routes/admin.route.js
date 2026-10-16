const express = require("express");
const {requireRole} = require("../middlewares/auth");
const { roleValidators, passwordValidators, emailValidations, nameValidators } = require("../validators/register.validate");
const { adminregistration } = require("../controllers/admin.controller");


const adminRouter = express.Router();

adminRouter.post("/register", requireRole("admin"), adminregistration);
adminRouter.post(
  "/agentregister",
  nameValidators,
  emailValidations,
  passwordValidators,
  roleValidators,
  adminregistration,
);
module.exports = adminRouter;