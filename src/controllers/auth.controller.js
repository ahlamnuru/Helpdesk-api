const { validationResult } = require("express-validator");
const { signToken, cookieOptions } = require("../utils/token");
const { comparePassword } = require("../utils/password");

module.exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }
  } catch (error) {}
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
