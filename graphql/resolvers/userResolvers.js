const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY = process.env.JWT_KEY


module.exports = {
    Mutation: {
        register: async (_, { 
            registerInput: { username, email, password, confirmPassword }
        }) => {
            try {
                //TODO validate user data
                //TODO make sure username does not already exist
                password = await bcrypt.hash(password, 12);
                const newUser = new User({
                    username,
                    email,
                    password
                });
                const res = await newUser.save();
                console.log(res);
                const token = jwt.sign({
                    id: res.id,
                    username,
                    email
                }, KEY, {
                    expiresIn: '4h'
                })
                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
            }
            catch(err){
                console.log(err);
                throw new Error(err);
            }
        }
    }
}