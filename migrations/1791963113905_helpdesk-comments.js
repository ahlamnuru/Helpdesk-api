import { body } from "express-validator";

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
  pgm.createTable("helpdesk_comments", {
    id: {
      type: "id"
    },
    ticket_id: {
      type: "id",
      references: '"helpdesk_tickets"(id)',
      onDelete: "CASCADE",
      notNull: true,
    },
    author_id: {
      type: "uuid",
      references: '"helpdesk_users"(id)',
      onDelete: "CASCADE",
      notNull: true,
    },
    body: {
      type: "varchar(255)",
      notNull: true,
    },
    is_internal: {
      type: "boolean",
      notNull: true,
      default: false,
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
