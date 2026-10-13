// One shared connection pool. Import it anywhere you need the database.
const { Pool } = require("pg");
const env = require("./env");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DATABASE_SSL ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
