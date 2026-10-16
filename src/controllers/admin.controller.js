const { hashPassword } = require("../utils/password");
const { insertagentfromAdmin, findOne } = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.adminregistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      return res.json({ message: errorsArray.map((er) => er.msg) });
    }
    const { email, password, fullname, role } = req.body;
    const agentexist = await findOne(email);

    if (agentexist) {
      return res.json({ message: "Email already in use" });
    }
    const hassedPssword = await hashPassword(password);

    const result = await insertagentfromAdmin([
      fullname,
      email,
      hassedPssword,
      role,
    ]);
    res.json({
      message: `Hello ${result.fullname} agent account created successfully`,
    });
  } catch (err) {
    next(err);
  }
};
