import { Router } from "express";// schame, midd, cont
import { newChoiceSchema } from "../schemas/choice.schemas.js";
//import { pollIdSchema } from "../schemas/mongoId.schemas.js";
import { newChoiceMiddleware } from "../middlewares/newChoiceMiddlewares.js";
import { newChoice, allChoicesPoll, vote } from "../controllers/choice.controllers.js";
//import { idMongoValidationMiddlewares } from "../middlewares/idMongoValidationMiddlewares.js";

const choiceRouter = Router();

choiceRouter.post("/choice", newChoiceMiddleware(newChoiceSchema), newChoice);
choiceRouter.get("/poll/:id/choice", allChoicesPoll);
choiceRouter.post("/choice/:id/vote", vote);

export default choiceRouter;

