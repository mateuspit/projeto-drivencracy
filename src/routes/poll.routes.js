import { Router } from "express";
import { newPollSchema } from "../schemas/poll.schemas.js";
import { newPollMiddleware } from "../middlewares/newPollMiddlewares.js";
import { getPolls, newPoll } from "../controllers/poll.controllers.js";

const pollRouter = Router();

pollRouter.post("/poll", newPollMiddleware(newPollSchema), newPoll);
pollRouter.get("/poll", getPolls);

export default pollRouter;