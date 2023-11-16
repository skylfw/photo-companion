const Model = require("./Model.js");

class Photo extends Model {
  static get tableName() {
    return "photos";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["imageUrl"],
      properties: {
        imageUrl: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Collection } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "photos.userId",
          to: "users.id",
        },
      },
      collection: {
        relation: Model.ManyToManyRelation,
        modelClass: Collection,
        join: {
          from: "photos.collectionId",
          to: "collections.id",
        },
      },
    };
  }
}

module.exports = Photo;
