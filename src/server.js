const env = require("./config/env");
const app = require("./app");
const pool = require("./config/db");

const server = app.listen(env.PORT, () => {
  console.log("Server running on http://localhost:" + env.PORT);
});

function shutdown(signal) {
  console.log(signal + " received, shutting down...");
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
