const Joi = require('joi');

module.exports = Joi.object({
        email : Joi.string().email().required(),
        booksBorrowed : Joi.array().items(Joi.object({
            bookId : Joi.string().alphanum().required(),
            dueDate : Joi.date().min('now').required()
        }).required()).default(null),
        booksReserved : Joi.array().items(Joi.object({
            bookId : Joi.string().alphanum().required()
        }).required()).default(null),
        lateFee : Joi.number().positive().unit('$').default(0),
        admin : Joi.boolean().default(false).forbidden()
    }).options({ abortEarly : false});