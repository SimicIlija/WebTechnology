'use strict';

const { User, validate } = require('../models/userModel');

exports.test = function(req, res){
    res.send("Hello from controller!");
}

exports.register = function(req, res){
    console.log(req.body);
    var {error, value} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //TODO: finish registration
    res.send("TODO");
}