/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("helpdesk_users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    fullname: {
      type: "varchra(100)",
      notNull: true,
    },
    email: {
      type: "varchar(100)",
      unique: true,
      notNull: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    role: {
      type: "varchar(10)",
      default: "user",
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
