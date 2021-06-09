import Joi from 'joi';

export default {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmedPassword: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
}
