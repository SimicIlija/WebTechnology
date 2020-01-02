'use strict'
const Joi = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    }
});

function validateUser(user) {
    console.log(user);
    const schema = {
        username: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(3).max(25).required().email(),
        password: Joi.string().min(3).max(25).required()
    };
    return  Joi.validate(user, schema);
}

exports.User = UserSchema;
exports.validate = validateUser;