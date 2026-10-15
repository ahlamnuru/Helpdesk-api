const { validationResult } = require("express-validator");
const { hashPassword, comparePassword } = require("../utils/password");
const { insertUser, findOne } = require("../models/user.model");
const { signToken, cookieOptions } = require("../utils/token");

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

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }

    const { email, password } = req.body;
    const user = await findOne(email);

    if (!user || !(await comparePassword(password, user.password))) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = await signToken(user);
    res.cookie("token", token, cookieOptions);
    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    next(error);
  }
};
