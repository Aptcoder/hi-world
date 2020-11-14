const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server')
const KEY = process.env.JWT_KEY

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, KEY);
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }

        throw new AuthenticationError('Authenticatino token must of the format Bearer [token]')
    };
     
    throw new AuthenticationError('Authentication header is required');
}