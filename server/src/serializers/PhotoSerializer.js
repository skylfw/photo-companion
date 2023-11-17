class PhotoSerializer {
  static async cleanPhoto(photo) {
    const allowedAttributes = ["imageUrl", "description"];

    const serializedPhoto = {};
    for (const attribute of allowedAttributes) {
      if (photo && photo.hasOwnProperty(attribute)) {
        serializedPhoto[attribute] = photo[attribute];
      }
    }
    return serializedPhoto;
  }
}

export default PhotoSerializer;
