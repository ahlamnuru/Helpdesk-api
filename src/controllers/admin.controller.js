const { hashPassword } = require("../utils/password");
const {
  insertagentfromAdmin,
  findOne,
  deactivate,
} = require("../models/user.model");
const { validationResult } = require("express-validator");
const { json } = require("express");

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
module.exports.decativateAccount = async (req, res, next) => {
  try {
    const { email, status } = req.body;
    const isUserExist = await findOne(email);
    if (!isUserExist || isUserExist.id === req.user.id) {
      return res.json({
        message: "Error Account not foud or self deactivation is not allowed",
      });
    }
    if (typeof status !== "boolean") {
      return res.json({ message: "Invalid status " });
    }
    const result = await deactivate(email, status);
    res.json({ message: "Staus changed sucusussfully", result });
  } catch (error) {}
};
