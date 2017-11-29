const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.key;

module.exports = {
    create(user) {
        let scopes;

        if (user.admin) {
            scopes = 'admin'
        }

        return jwt.sign({ id: user._id, email: user.email, scope: scopes}, secret, { algorithm: 'HS256', expiresIn: "2h" });
    }
}