const Joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string() .min(6) .required()
    });
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation;