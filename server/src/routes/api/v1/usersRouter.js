import express from "express";
import { User, Collection } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";

const usersRouter = new express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/locations", async (req, res) => {
  function capitalizeFirstLetterOfEachWord(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  try {
    const locations = await User.query()
      .select(User.raw("LOWER(location) AS location"))
      .distinctOn("location");
    const stringLocations = locations.map((location) => String(location.location));
    const capitalizedLocations = stringLocations.map((location) =>
      capitalizeFirstLetterOfEachWord(location)
    );
    return res.status(201).json({ locations: capitalizedLocations });
  } catch (error) {
    console.error("Error fetching location options:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.query().findById(id);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.get("/:id/collections", async (req, res) => {
  const userId = req.params.id;
  try {
    const collections = await Collection.query().where("userId", userId);
    return res.json({ collections });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { email, username, password, passwordConfirmation, location } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({
      email,
      username,
      password,
      location,
    });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/search/location", async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ errors: "Location parameter is required for search." });
  }
  try {
    const users = await User.query().where("location", "ilike", `%${location}%`);
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

usersRouter.patch("/:id", uploadImage.single("profileImg"), async (req, res) => {
  try {
    const user = req.user;
    const newImage = req.file.location;
    const body = await user.$query().patchAndFetch({ profileImg: newImage });
    return res.status(201).json({ body });
  } catch (error) {
    // if (error instanceof ValidationError) {
    //   return res.status(422).json({ errors: error.data });
    // }
    return res.status(500).json({ errors: error });
  }
});

usersRouter.patch("/:id/location", async (req, res) => {
  try {
    const user = req.user;
    const { location } = req.body;
    const updatedUser = await user.$query().patchAndFetch({ location });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;
