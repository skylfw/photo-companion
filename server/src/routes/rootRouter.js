import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import collectionsRouter from "./api/v1/collectionsRouter.js";
import photosRouter from "./api/v1/photosRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/collections", collectionsRouter);
rootRouter.use("/api/v1/photos", photosRouter);
//place your server-side routes here

export default rootRouter;
