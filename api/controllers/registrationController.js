'use strict';

const { User, validate } = require('../models/userModel');

exports.test = async function (req, res) {
    let users = await User.find({});
    res.status(200).json(users);
}

exports.register = async function (req, res) {
    var { error, value } = validate(req.body);
    console.log(req.body);
    if (error) {
        console.log(error.details[0]);
        return res.status(400).json(error.details[0].message);
    }
    if (req.body.password !== req.body.repeatPassword) {
        console.log(2);
        return res.status(400).json("Passwords don't match");
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        console.log(3);
        return res.status(400).json('User with that email already exisits!');
    }
    user = await User.findOne({ username: req.body.username });
    if (user) {
        console.log(4);
        return res.status(400).json('User with that username already exisits!');
    }
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    console.log(5);
    res.status(200).json(req.body.username + " succesfully registred!");
}