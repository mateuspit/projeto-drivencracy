import { Router } from "express";// schame, midd, cont
import { newChoiceSchema } from "../schemas/choice.schemas.js";
import { newChoiceMiddleware } from "../middlewares/newChoiceMiddlewares.js";
import { newChoice } from "../controllers/choice.controllers.js";

const choiceRouter = Router();

choiceRouter.post("/choice", newChoiceMiddleware(newChoiceSchema), newChoice);

export default choiceRouter;

