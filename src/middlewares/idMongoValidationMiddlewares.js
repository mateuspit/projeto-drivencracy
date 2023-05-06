export function idMongoValidationMiddlewares(schema) {
    return ((req, res, next) => {
        const { pollId } = req.params.id
        const { error } = schema.validate(pollId, { abortEarly: false })
        if (error) {
            const errorMessages = error.details.map(ed => ed.message);
            return res.status(422).send(errorMessages)
        }
        next();
    });
}