import express from "express";
import { Collection, Photo } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import CollectionSerializer from "../../../serializers/CollectionSerializer.js";
import uploadImage from "../../../services/uploadImage.js";

const collectionsRouter = new express.Router();

collectionsRouter.get("/", async (req, res) => {
  try {
    const collections = await Collection.query().withGraphFetched("[photos, user]");
    const serializedCollections = await CollectionSerializer.getSummary(collections);
    return res.status(200).json({ collections: serializedCollections });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

collectionsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const collection = await Collection.query().findById(id).withGraphFetched("[photos, user]");
    const serializedCollection = await CollectionSerializer.getDetails(collection);
    return res.status(200).json({ collection: serializedCollection });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

collectionsRouter.post("/", uploadImage.array("images"), async (req, res) => {
  const { body, files } = req;
  const formInput = cleanUserInput(body);
  const { title, description } = formInput;

  try {
    const newCollection = await Collection.query().insertAndFetch({
      userId: req.user.id,
      title,
      description,
      coverImage: files[0].location,
    });

    files.forEach(async (file) => {
      await Photo.query().insert({
        userId: req.user.id,
        collectionId: newCollection.id,
        imageUrl: file.location,
      });
    });

    return res.status(201).json({ newCollection });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

collectionsRouter.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const collectionId = req.params.id;

  try {
    const collection = await Collection.query().findById(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    const collectionUserId = collection.userId;

    if (userId === collectionUserId) {
      await Photo.query().delete().where("collectionId", collectionId);

      const deletedRows = await Collection.query().deleteById(collectionId);

      if (deletedRows > 0) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(404).json({ error: "Collection not found" });
      }
    } else {
      return res.status(401).json({ error: "Not authorized to delete collection" });
    }
  } catch (error) {
    console.error("Error deleting collection:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default collectionsRouter;
