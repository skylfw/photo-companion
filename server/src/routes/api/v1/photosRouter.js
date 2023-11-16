import express from "express";
import { Photo } from "../../../models/index.js";

const photosRouter = new express.Router();

photosRouter.get("/", async (req, res) => {
  try {
    const photos = await Photo.query();
    res.status(200).json({ photos: photos });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default photosRouter;
