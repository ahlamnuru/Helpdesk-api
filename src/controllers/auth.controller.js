const { validationResult } = require("express-validator");
const { hashPassword } = require("../utils/password");
const { insertUser } = require("../models/user.model");

module.exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }
    const { email, password, fullname } = req.body;
    // find the user if exist from the user model
    const userexist = await findOne(email);
    if (userexist) {
      return req.json({ message: "Email already in use" });
    }
    // otehr wise teh user can regester
    //let use hase the password
    const hassedPssword = await hashPassword(password);

    // let usinser theuser
    const result = await insertUser([fullname, email, hassedPssword]);
    res.json({
      message: `Hellow ${result.fullname} accoutn created Sucussfully`,
    });
  } catch (err) {
    next(err);
  }
};
