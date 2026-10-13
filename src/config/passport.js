// JWT strategy: reads the token from the "token" cookie or an "Authorization: Bearer <token>" header.
const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const env = require("./env");

const fromCookieOrHeader = (req) => {
  if (req.cookies && req.cookies.token) return req.cookies.token;
  const header = req.headers.authorization;
  return header && header.startsWith("Bearer ") ? header.slice(7) : null;
};

passport.use(
  new JwtStrategy(
    { jwtFromRequest: fromCookieOrHeader, secretOrKey: env.JWT_SECRET, algorithms: ["HS256"] },
    async (payload, done) => {
      return done(null, { id: payload.sub, role: payload.role });
    }
  )
);

module.exports = passport;
