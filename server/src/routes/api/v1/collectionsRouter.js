import express from "express";
import { Collection } from "../../../models/index.js";

const collectionsRouter = new express.Router();

collectionsRouter.get("/", async (req, res) => {
  try {
    const collections = await Collection.query();
    res.status(200).json({ collections: collections });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

collectionsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const collection = await Collection.query().findById(id);
    return res.status(200).json({ collection });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

export default collectionsRouter;
