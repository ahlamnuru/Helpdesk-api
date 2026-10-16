const { ExpressValidator } = require("express-validator");

const {body} = require(ExpressValidator);

const ticketValidators = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("the title field cannot be empty")
    .isLength({min: 5, max: 100})
    .withMessage("the title field must be between 5 and 100 characters")
]
const commentValidators = [
  body("description")
  .trim()
  .notEmpty()
  .withMessage("The description can not be empty")
]

module.exports = {
  ticketValidators,
  commentValidators
}