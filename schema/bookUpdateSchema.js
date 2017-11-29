const Joi = require('joi');

module.exports = Joi.object({
    title : Joi.string(),
    author : Joi.string(),
    genre : Joi.string().lowercase(),
    publication : Joi.object({
        date : Joi.date().iso().example('2014-06-30'),
        company : Joi.string()
    }).and('date', 'company'),
    availability : Joi.object({
        available : Joi.string().lowercase().allow('yes', 'no'),
        borrowedBy : Joi.string().when('available', { is : 'no', then : Joi.required() }).when('available', { is : 'yes', then : Joi.string().default(null)}) ,
        copies : Joi.number().integer().min(0),
        edition : Joi.string()
    }).and('available', 'copies', 'edition')
}).options({ abortEarly : false}).or('title', 'author', 'genre', 'publication', 'availability')