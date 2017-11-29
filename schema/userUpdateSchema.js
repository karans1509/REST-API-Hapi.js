const Joi = require('joi');

module.exports = Joi.object({
    email : Joi.string().email(),
    booksBorrowed : Joi.array().items(Joi.object({
        bookId : Joi.string().alphanum(),
        dueDate : Joi.date().min('now')
    }).and('bookId', 'dueDate')),
    booksReserved : Joi.array().items(Joi.object({
        bookId : Joi.string().alphanum()
    }).and('bookId')),
    lateFee : Joi.number().positive().unit('$'),
    admin : Joi.boolean().default(false).forbidden()
}).options({ abortEarly : false}).or('email', 'booksBorrowed', 'booksReserved', 'lateFee');