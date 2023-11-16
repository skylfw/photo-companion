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

export default collectionsRouter;
