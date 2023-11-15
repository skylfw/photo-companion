/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("username");
    table.string("location");
    table.string("expertise");
    table
      .string("profile_img")
      .defaultTo(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
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
