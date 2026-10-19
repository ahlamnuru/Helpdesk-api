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
  pgm.createTable("ticket_status_events", {
    id: {
      type: "id",
    },
    ticket_id: {
      type: "integer",
      references: '"helpdesk_tickets"(id)',
      onDelete: "CASCADE",
      notNull: true,
      index: true,
    },
    user_id: {
      type: "uuid",
      references: '"helpdesk_users"(id)',
      onDelete: "SET NULL",
      notNull: true,
    },
    user_role: {
      type: "varchar(50)",
      notNull: true,
    },
    from_status: {
      type: "varchar(15)",
      notNull: true,
    },
    to_status: {
      type: "varchar(15)",
      notNull: true,
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
export const down = (pgm) => {
  pgm.dropTable("ticket_status_events");
};
