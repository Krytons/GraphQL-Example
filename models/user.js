const { composeWithMongoose } = require('graphql-compose-mongoose');
const mongoose = require('mongoose');
const debug = require('debug')('app:models:user');

debug('Initializing user schema');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, maxLength: 25 },
    surname: { type: String, require: true, maxLength: 25 },
    taxCode: { type: String, require: true, unique: true, length: 16, index: true},
    email: { type: String, require: true, unique: true, maxLength: 25, index: true},
    birthDate: {type: Date},
    role:{ type: String, maxLength: 50 },
    phoneNumber:{ type: String, maxLength: 15 },
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const User = mongoose.model('User', userSchema);
const UserTC = composeWithMongoose(User);
module.exports ={
    User,
    UserTC
} 