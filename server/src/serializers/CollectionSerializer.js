import PhotoSerializer from "./PhotoSerializer.js";

class CollectionSerializer {
  static async getSummary(collections) {
    const allowedAttributes = ["title", "description", "username", "photos"];

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
    const allowedAttributes = ["title", "description", "photos", "username"];
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
