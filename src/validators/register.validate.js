const { body } = require("express-validator");

const emailValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email option can not be empty")
    .isEmail()
    .withMessage("Error invalid email format pleas try agan")
    .normalizeEmail(),
];
const nameValidators = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("The Name filed cannot be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Only aplhabetic letters are allowed for this filed")
    .escape(),
];
const passwordValidators = [
  body("password")
    .trim()
    .isLength({ min: 4, max: 25 })
    .withMessage("The password length must be bettwen 8 and 25 "),
];
const confirmPasswordValidators = [
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("The confirm password field cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(
          "The confirm password field must match the password field",
        );
      }
      return true;
    }),
];

module.exports = {
  emailValidations,
  nameValidators,
  passwordValidators,
  confirmPasswordValidators,
};
