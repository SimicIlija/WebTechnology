'use strict'
const Joi = require('@hapi/joi');
const { User } = require('../models/userModel');

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(25).required(),
        password: Joi.string().min(3).max(25).required()
    };
    return  Joi.validate(user, schema);
}

exports.login = async function(req, res){
    var { error, value } = validateUser(req.body);
    console.log(req.body);
    if (error) {
        console.log(error.details[0]);
        return res.status(400).json(error.details[0].message);
    }
    var user = await User.findOne({ username: req.body.username });
    if(!user){
        return res.status(400).json('User with that username does not exisit!');
    }
    if(user.password !== req.body.password){
        return res.status(400).json('Invalid password!');
    }
    return res.status(200).json(req.body.username);
}