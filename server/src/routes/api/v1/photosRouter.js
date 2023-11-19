import express from "express";
import { Photo } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const photosRouter = new express.Router();

photosRouter.get("/", async (req, res) => {
  try {
    const photos = await Photo.query();
    res.status(200).json({ photos: photos });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

photosRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { imageUrl, collectionId } = formInput;
  try {
    const newPhoto = await Photo.query().insertAndFetch({
      userId: req.user.id,
      collectionId,
      imageUrl,
    });
    return res.status(201).json({ newPhoto });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default photosRouter;
