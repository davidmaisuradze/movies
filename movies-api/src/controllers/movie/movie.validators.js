import Joi from 'joi';

export default {
    createMovie: Joi.object({
        userEmail: Joi.string().email().allow(null, ''),
        title: Joi.string().required(),
        imageData: Joi.string().required(),
        description: Joi.string().required(),
    }),
    updateMovie: Joi.object({
        _id: Joi.string().required(),
        userEmail: Joi.string().email().allow(null, ''),
        title: Joi.string().required(),
        imageData: Joi.string().required(),
        description: Joi.string().required(),
    }),
        toggleFavourite: Joi.object({
        _id: Joi.string().required(),
        isFavourite: Joi.boolean().required()
    }),
    deleteMovie: Joi.object({
        movieId: Joi.string().required()
    })
}
