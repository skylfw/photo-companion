import PhotoSerializer from "./PhotoSerializer.js";

class CollectionSerializer {
  static async getSummary(collections) {
    const allowedAttributes = [
      "id",
      "userId",
      "title",
      "description",
      "username",
      "photos",
      "coverImage",
    ];

    const collectionsWithUsernames = collections.map((collection) => {
      const username = collection.user ? collection.user.username : null;
      return { ...collection, username };
    });

    const serializedCollections = await Promise.all(
      collectionsWithUsernames.map(async (collection) => {
        let serializedCollection = {};
        for (const attribute of allowedAttributes) {
          if (attribute === "photos") {
            const cleanPhoto = await Promise.all(
              collection[attribute].map((photo) => {
                return PhotoSerializer.cleanPhoto(photo);
              })
            );
            serializedCollection[attribute] = cleanPhoto;
          } else {
            serializedCollection[attribute] = collection[attribute];
          }
        }
        return serializedCollection;
      })
    );
    return serializedCollections;
  }

  static async getDetails(collection) {
    const allowedAttributes = [
      "id",
      "title",
      "description",
      "photos",
      "username",
      "coverImage",
      "userId",
    ];
    const username = collection.user ? collection.user.username : null;
    let serializedCollection = {};

    for (const attribute of allowedAttributes) {
      if (attribute === "photos") {
        const cleanPhoto = await Promise.all(
          collection[attribute].map((photo) => {
            return PhotoSerializer.cleanPhoto(photo);
          })
        );
        serializedCollection[attribute] = cleanPhoto;
      } else {
        serializedCollection[attribute] = collection[attribute];
      }
    }

    return { ...serializedCollection, username };
  }
}

export default CollectionSerializer;
