const Boom = require('Boom');
const Hapi = require('hapi');
const Joi = require('joi');

require('dotenv').config();

const server = new Hapi.Server();

server.connection({
    host : 'localhost',
    port : process.env.port
})

server.register(require('hapi-auth-jwt'), (err)=>{

    server.auth.strategy('jwt', 'jwt', {
        key : process.env.key,
        verifyOptions : { algorithms : ['HS256'] }
    });
    
    server.route(require('./routes/books'));
    server.route(require('./routes/users'));

})

server.start((err)=>{
    if(err) {
        console.log(err);
    }
    console.log('Server running at '+server.info.uri);
})

