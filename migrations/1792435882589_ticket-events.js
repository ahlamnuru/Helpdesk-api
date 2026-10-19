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
  pgm.createTable("ticket_events", {
    id: {
      type: "id",
    },
    ticket_id: {
      type: "id",
      references: '"helpdesk_tickets"(id)',
      onDelete: "NO ACTION",
    },
    actor_id: {
      type: "uuid",
      references: '"helpdesk_users"(id)',
      onDelete: "NO ACTION",
      notNull: true,
    },
    type: {
      type: "varchar(100)",
      notNull: true,
    },
    from_value: {
      type: "varchar(100)",
      notNull: true,
    },
    to_value: {
      type: "varchar(100)",
      notNull: true,
    },
    issue_Date: {
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
