const Boom = require('boom');
const Joi = require('joi');
const monk = require('monk');

// Reading the database configuration
require('dotenv').config();

// Connecting to mongo db
const db = monk(process.env.DB_URL);

const books = db.get('books');

module.exports = [
    {
        method: 'GET',
        path: '/books',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user']
            },
            handler: (request, reply) => {
                let query = {};
                if (request.query != null) {
                    if (request.query.genre != null) {
                        query.genre = request.query.genre;
                    }
                    if (request.query.title != null) {
                        query.title = {
                            $regex: request.query.title,
                            $options: 'i'
                        }
                    }
                    if (request.query.author != null) {
                        query.author = request.query.author;
                    }
                }
                books.find(query, { limit: 10 }, (err, docs) => {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (docs.length > 0) {
                        reply(docs);
                    }
                    else {
                        reply("No books found");
                    }
                })
            }

        }

    },
    {
        method: 'POST',
        path: '/books',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user']
            },
            validate: {
                payload: require('../schema/bookPostSchema')
            },
            handler: (request, reply) => {
                books.insert(request.payload, (err) => {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    reply('Data inserted');
                });
            }
        }
    },
    {
        method: 'GET',
        path: '/books/{id}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user']
            },
            handler: (request, reply) => {
                let id = request.params.id;
                books.find({ _id: id }, function (err, result) {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (result) {
                        reply(result);
                    }
                    else
                        reply('No Book found with this id');
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user']
            },
            validate: {
                payload: require('../schema/bookUpdateSchema')
            },
            handler: (request, reply) => {
                let id = request.params.id;
                books.update({ _id: id }, { $set: request.payload }, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (result.nModified == 1) {
                        reply('Book Data Modified');
                    }
                    else {
                        reply('Book not found');
                    }
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: (request, reply) => {
                let id = request.params.id;
                books.remove({ _id: id }, function (err, result) {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (result.deletedCount == 1) {
                        reply('Book deleted from database');
                    }
                    else
                        reply('Book not found');
                });
            }
        }
    },
]