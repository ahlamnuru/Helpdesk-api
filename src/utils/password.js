const bycript = require("bcryptjs");
module.exports.hashPassword = async (plainpassword) => {
  const saltrounds = await bycript.genSalt(15);
  return bycript.hash(plainpassword, saltrounds);
};

module.exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

