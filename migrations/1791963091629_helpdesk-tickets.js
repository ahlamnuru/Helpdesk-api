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
  pgm.createTable("helpdesk_tickets", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
    },
    title: {
      type: "varchar(100)",
      notNull: true,
    },
    description: {
      type: "varchar(255)",
      notNull: true,
    },
    status: {
      type: "varchar(15)",
      default: "open",
      index: true,
    },
    priority: {
      type: "varchar(10)",
      default: "medium",
    },
    customer_id: {
      type: "uuid",
      references: "helpdesk_users(id)",
      notNull: true,
      index: true,
    },
    assigned_id: {
      type: "uuid",
      references: "helpdesk_users(id)",
      index: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
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
