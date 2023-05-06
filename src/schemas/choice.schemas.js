import Joi from "joi";

export const newChoiceSchema = Joi.object({
    title: Joi.string().required().min(1),
    pollId: Joi.alternatives().try(
        Joi.string().length(12),
        Joi.string().length(24).hex(),
        Joi.number().integer()
    ).required()

});