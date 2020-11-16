const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserInputError } = require('apollo-server')
const KEY = process.env.JWT_KEY
const { registerValidator, loginValidator } = require('../../util/validator');

module.exports = {
    Mutation: {

        login: async (_, { username, password }) => {
                const { valid, errors} = loginValidator(username, password);
                if(valid){
                    console.log(valid)
                    throw new UserInputError('Errors', {
                        errors: errors
                    });
                } 
                const user = await User.findOne({username: username});
                if(!user){
                    errors.general = 'User not found';
                    throw new UserInputError('User with email not found')
                }
                const match = await bcrypt.compare(password, user.password);
                if(!match){
                    errors.general = 'Wrong credentials';
                    throw new UserInputError('Wrong credentials');
                }
                const token = generateToken(user);
                return {
                    ...user._doc,
                    id: user._id,
                    token
                }
        },
        register: async (_, { 
            registerInput: { username, email, password, confirmPassword }
        }) => {
                //TODO validate user data
                //TODO make sure username does not already exist
                const { valid, errors} = registerValidator(email, username, password, confirmPassword)
                if(valid){
                    console.log(valid)
                    throw new UserInputError('Errors', {
                        errors: errors
                    })
                }
                const user = await User.findOne({ username: username });
                if(user){
                    throw new UserInputError('Username already exists', {
                        errors: {
                            username: 'This username is taken'
                        }
                    });
                }
                password = await bcrypt.hash(password, 12);
                const newUser = new User({
                    username,
                    email,
                    password
                });
                const res = await newUser.save();
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
    }
}

function generateToken(user){
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, KEY, {
        expiresIn: '4h'
    });

    return token;
}