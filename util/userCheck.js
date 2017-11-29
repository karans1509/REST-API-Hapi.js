const Boom = require('boom');
const monk = require('monk');

require('dotenv').config();

const db = monk(process.env.DB_URL);
const users = db.get('users');

module.exports = {
    checkUser(request, reply){
        users.findOne({ email : request.payload.email }, (err, result)=>{
           
            if(result) {
                reply(Boom.badRequest('Email already registered'));
            }
            else {
                reply(request.payload);
            }
        })
    },
    verifyUser(request, reply) {
        users.findOne({ email : request.payload.email }, (err, result)=>{
            
             if(result) {
                 reply(result);    
             }
             else {
                 
                 reply(Boom.badRequest('Incorrect Email'));
             }
         })
    }
}
    

