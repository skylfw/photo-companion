import { Photo, Collection, User } from "../../models/index.js";

class PhotoSeeder {
  static async seed() {
    const testUser = await User.query().findOne({ email: "sky@launch.com" });
    const testCollection = await Collection.query().findOne({ title: "collection 1" });

    const testUser2 = await User.query().findOne({ email: "s@123.com" });
    const testCollection2 = await Collection.query().findOne({ title: "s gallery" });

    const photosData = [
      {
        userId: testUser.id,
        collectionId: testCollection.id,
        imageUrl: "https://photo-companion-production.s3.amazonaws.com/logo.png",
        description: "a photo",
      },
      {
        userId: testUser.id,
        collectionId: testCollection.id,
        imageUrl:
          "https://images.unsplash.com/photo-1699019950419-ffe12ae956c4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "2nd photo",
      },
      {
        userId: testUser.id,
        collectionId: testCollection.id,
        imageUrl:
          "https://images.unsplash.com/photo-1699462516277-7294d37e5cc3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        userId: testUser2.id,
        collectionId: testCollection2.id,
        imageUrl:
          "https://images.unsplash.com/photo-1699155758832-a80cdffc17e7?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "1st photo",
      },
    ];

    for (const photo of photosData) {
      const currentPhoto = await Photo.query().findOne({ imageUrl: photo.imageUrl });
      if (!currentPhoto) {
        await Photo.query().insert(photo);
      }
    }
  }
}

export default PhotoSeeder;
