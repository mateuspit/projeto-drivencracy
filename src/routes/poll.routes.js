import { Router } from "express";
import { newPollSchema } from "../schemas/poll.schemas.js";
import { newPollMiddleware } from "../middlewares/newPollMiddlewares.js";
import { newPoll } from "../controllers/poll.controllers.js";
import Joi from "joi";
const pollRouter = Router();
//const newPollSchema = Joi.object({
//    title: Joi.string().min(1).required(),
//    expireAt: Joi.string()
//        .pattern(/^(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})$/)
//});
//async function newPollMiddleware(schema) {
//    return ((req, res, next) => {
//        const { error } = schema.validate(req.body, { abortEarly: false });
//        if (error) {
//            const errorMessages = error.details.map(ed => ed.message);
//            return res.status(422).send(errorMessages);
//        }
//        next();
//    });
//}
pollRouter.post("/poll", newPollMiddleware(newPollSchema), newPoll);
//pollRouter.post("/poll", newPoll);
export default pollRouter;