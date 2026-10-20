const express = require("express");
const {
  nameValidators,
  emailValidations,
  passwordValidators,
  confirmPasswordValidators,
} = require("../validators/register.validate");
const { register, login } = require("../controllers/auth.controller");
const { logOut } = require("../middlewares/auth");
const authRouter = express.Router();

//
authRouter.post(
  "/register",
  nameValidators,
  emailValidations,
  passwordValidators,
  confirmPasswordValidators,
  register,
);

authRouter.post("/login", emailValidations, passwordValidators, login);
authRouter.post("/logout", logOut);
module.exports = authRouter;
