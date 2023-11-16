import express from "express";
import { Collection } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
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

collectionsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { title, description } = formInput;
  try {
    const newCollection = await Collection.query().insertAndFetch({
      userId: req.user.id,
      title,
      description,
    });
    console.log(newCollection);
    return res.status(201).json({ newCollection });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});
export default collectionsRouter;
