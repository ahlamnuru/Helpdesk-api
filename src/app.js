const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const env = require("./config/env");
const passport = require("./config/passport");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

if (env.isProd) app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(morgan(env.isProd ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);
app.get("/", (req, tes) => {
  req.logout({});
});

module.exports = app;
