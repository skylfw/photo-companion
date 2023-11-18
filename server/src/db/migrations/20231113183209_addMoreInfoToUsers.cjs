/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("username").notNullable().unique();
    table.string("location");
    table.string("expertise");
    table
      .string("profileImg")
      .defaultTo("https://photo-companion-production.s3.amazonaws.com/blank-profile-picture.png");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("username");
    table.dropColumn("location");
    table.dropColumn("expertise");
    table.dropColumn("profile_img");
  });
};
