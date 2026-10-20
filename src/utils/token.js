const jwt = require("jsonwebtoken");
const env = require("../config/env");

async function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.isProd,
  maxAge: 15 * 60 * 1000,
};

module.exports = { signToken, cookieOptions };
