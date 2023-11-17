const Model = require("./Model.js");

class Collection extends Model {
  static get tableName() {
    return "collections";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Photo } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "collections.userId",
          to: "users.id",
        },
      },
      photos: {
        relation: Model.HasManyRelation,
        modelClass: Photo,
        join: {
          from: "collections.id",
          to: "photos.collectionId",
        },
      },
    };
  }
}

module.exports = Collection;
