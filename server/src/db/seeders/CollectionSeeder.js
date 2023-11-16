import { Collection, User } from "../../models/index.js";

class CollectionSeeder {
  static async seed() {
    const testUser = await User.query().findOne({ email: "sky@launch.com" });
    const testUser2 = await User.query().findOne({ email: "s@123.com" });

    const collectionsData = [
      {
        userId: testUser.id,
        title: "collection 1",
        description: "something",
      },
      {
        userId: testUser2.id,
        title: "s gallery",
        description: "sssss",
      },
    ];

    for (const collection of collectionsData) {
      const currentCollection = await Collection.query().findOne({ title: collection.title });
      if (!currentCollection) {
        await Collection.query().insert(collection);
      }
    }
  }
}

export default CollectionSeeder;
