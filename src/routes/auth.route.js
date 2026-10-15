const express = require("express");
const {
  nameValidators,
  emailValidations,
  passwordValidators,
  confirmPasswordValidators,
} = require("../validators/register.validate");
const { register, login } = require("../controllers/auth.controller");
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
module.exports = authRouter;
