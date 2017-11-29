const Joi = require('joi');

module.exports = Joi.object({
        title : Joi.string().required(),
        author : Joi.string().required(),
        genre : Joi.string().lowercase().required(),
        publication : Joi.object({
            date : Joi.date().iso().required().example('2014-06-30'),
            company : Joi.string().required()
        }).required(),
        availability : Joi.object({
            available : Joi.string().lowercase().allow('yes', 'no').required(),
            borrowedBy : Joi.string().when('available', { is : 'no', then : Joi.required() }).when('available', { is : 'yes', then : Joi.string().default(null)}) ,
            copies : Joi.number().integer().min(0).required(),
            edition : Joi.string().required()
        }).required()
    }).options({ abortEarly : false});