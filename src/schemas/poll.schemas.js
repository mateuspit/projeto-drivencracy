import Joi from "joi";

export const newPollSchema = Joi.object({
    title: Joi.string().min(1).required(),
    expireAt: Joi.string()
        //.pattern(/^\d{4}-\d{2}-\d{2}\s(0?[1-9]|1[0-2]):\d{2}$/)
        //.pattern(/^\d{4}-\d{2}-\d{2}\s([01][0-9]|2[0-3]):[0-5][0-9]$/)
        //.pattern(/^\d{4}-\d{2}-\d{2}\s(0?[1-9]|1[0-2]):[0-5][0-9]$/)
        .pattern(/^\d{4}-\d{2}-\d{2}\s(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        
        .allow("")
});