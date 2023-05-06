import Joi from "joi";

export const pollIdSchema = Joi.object({
    pollId: Joi.alternatives().try(
        Joi.string().length(12),
        Joi.string().length(24).hex(),
        Joi.number().integer()
    ).required()
});