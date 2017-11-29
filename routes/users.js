const Boom = require('boom');
const Joi = require('joi');
const monk = require('monk');

const check = require('../util/userCheck');
const token = require('../util/token');

require('dotenv').config();

const db = monk(process.env.DB_URL);
const users = db.get('users');


module.exports = [
    {
        method: 'GET',
        path: '/users',
        config: {
            handler: (request, reply) => {
                let query = {};
                console.log(request.query);
                if (request.query != {}) {
                    if (request.query.late_fee == '') {
                        query = { lateFee: { $gt: parseInt(0) } }
                    }
                }
                users.find(query, { limit: 10 }, (err, docs) => {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (docs.length > 0)
                        reply(docs);
                    else {
                        reply("No Users in the database");
                    }
                })
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            }
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, reply) => {
            users.insert(request.payload, (err, user) => {
                if (err) {
                    console.log(err);
                    throw Boom.badRequest(err);
                }
                reply({ token: token.create(user) });
            })
        },
        config: {
            validate: {
                payload: require('../schema/userPostSchema')
            },
            pre: [
                { method: check.checkUser }
            ],

        }
    },
    {
        method: 'GET',
        path: '/users/{email}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'user']
            },
            handler: (request, reply) => {
                let emailId = request.params.email;
                users.find({ email: emailId }, function (err, result) {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }

                    if (result) {
                        reply(result);
                    }
                    else
                        reply('No user found with this Email Id');
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/users/auth',
        handler: (request, reply) => {
            reply({ token: token.create(request.pre.user) });
        },
        config: {
            pre: [
                { method: check.verifyUser, assign: 'user' }
            ],
            validate: {
                payload: {
                    email: Joi.string().email().required()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: require('../schema/userUpdateSchema')
            },
            handler: (request, reply) => {
                let id = request.params.id;
                users.update({ _id: id }, { $set: request.payload }, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (result.nModified == 1) {
                        reply('User Data Modified');
                    }
                    else {
                        reply('User not found');
                    }
                })
            }
        },
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: (request, reply) => {
                let id = request.params.id;
                users.remove({ _id: id }, function (err, result) {
                    if (err) {
                        console.log(err);
                        throw Boom.badRequest(err);
                    }
                    if (result.deletedCount == 1) {
                        reply('User deleted from database');
                    }
                    else
                        reply('User not found');
                });
            }
        }
    },
]