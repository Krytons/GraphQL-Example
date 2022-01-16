const {User, UserTC} = require('../models/user');
const debug = require('debug')('app:services:user');
const bufferFrom = require('buffer-from');
const crypto = require('crypto');
const { JWT_SECRET, JWT_EXPIRES_HOURS, JWT_EXPIRES_STRING } = require('../env');
const jwt = require('jsonwebtoken');
const {TokenITC, Token} = require('../models/utilities/token');

const LoginResolver = function (UserTC, User){
    return {
        kind: 'query',
        name: 'login',
        args: {
            email: 'String!', //Required
            password: 'String!', //Required
        },
        type: Token,
        resolve: async ({ args, context }) => {
            debug("Executing login user service");

            const user = await User.findOne({
                email: args.email,
                password: bufferFrom(crypto.createHash('sha256').update(args.password, 'utf-8').digest()).toString('base64')
            });

            if (!user)
                throw new Error("Login failed. Check email and password");

            const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: `${JWT_EXPIRES_STRING}`});
            return {
                accessToken,
                expiresIn: 3600 * JWT_EXPIRES_HOURS
            }        
        }
    }
}

const SigninResolver = function (UserTC, User){
    return {
        kind: 'mutation',
        name: 'signin',
        args: {
            email: 'String!', //Required
            name: 'String!', 
            surname: 'String!',
            password: 'String!',
            passwordCheck: 'String!',
            taxCode: 'String!',
            birthDate: 'Date',
            role: 'String',
            phoneNumber: 'String',
        },
        type: Token,
        resolve: async ({ args, context }) => {
            debug("Executing signin user service"); 

            if (args.password != args.passwordCheck)
                throw new Error("Password and password check field must be the same");
            args.email = args.email.toLowerCase();
            const newUser = new User(args);

            newUser.password = bufferFrom(crypto.createHash('sha256')
                .update(args.password, 'utf-8').digest()).toString('base64');
            await newUser.save();

            const accessToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: `${JWT_EXPIRES_STRING}`});
            newUser.token = {
                accessToken,
                expiresIn: 3600 * JWT_EXPIRES_HOURS
            }
            return {
                accessToken,
                expiresIn: 3600 * JWT_EXPIRES_HOURS
            }
        }
    }
}

module.exports = {
    LoginResolver,
    SigninResolver
};