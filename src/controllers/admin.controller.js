const { hashPassword } = require("../utils/password");
const {
  insertagentfromAdmin,
  findOne,
  deactivate,
  removeAccount,
  getAllhelpdeskusers,
} = require("../models/user.model");
const { grabAllticketevents } = require("../models/evnt.model");
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
module.exports.deleteAccount = async (rsq, res, next) => {
  try {
    const { email } = req.body;
    const isAdminDeletinself = await findOne(email);
    if (
      !isAdminDeletinself ||
      (isAdminDeletinself.id === req.user.id &&
        isAdminDeletinself.role === "admin")
    ) {
      return res.json({
        message: "Accout not found or admin sel delation is not allowed",
      });
    }
    await removeAccount(email);
    res.json({
      message: `Accoutn with email ${email} have been deleted sucussfully`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllusers = async (re, res, next) => {
  try {
    const users = await getAllhelpdeskusers();
    res.json({ allusers: users });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllticketevents = async (req, res, next) => {
  try {
    const allEvents = await grabAllticketevents();
    res.json(allEvents);
  } catch (error) {
    next(error);
  }
};
