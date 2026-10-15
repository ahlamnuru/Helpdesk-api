const bcrypt = require("bcryptjs");
module.exports.hashPassword = async (plainpassword) => {
  const saltrounds = await bcrypt.genSalt(15);
  return bcrypt.hash(plainpassword, saltrounds);
};

module.exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};