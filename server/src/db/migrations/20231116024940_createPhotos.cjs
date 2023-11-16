/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("photos", (table) => {
    table.bigIncrements("id");
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id");
    table.string("imageUrl").notNullable();
    table.bigInteger("collectionId").notNullable().unsigned().index().references("collections.id");
    // tags - needs to be its own table - likely a many-to-many with photos - add later
    // focus on CRUD for photos and collections first
    table.string("description");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("photos");
};
