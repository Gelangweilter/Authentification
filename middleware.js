// package imports //
const express = require("express");
const mongoose = require("mongoose");
const User = require("./schemes/userScheme")


// other imports //
const router = express.Router();

// looking for token sent by user //
const verifyJWTToken = async (req, res, next) => {
    const user = await User.findOne({ jwt: req.headers.authorization });
    console.log(req.headers.authorization)
    if (user) {
        req.userData = user
        next();
    } else {
        res.status(201).json({ msg: "There is no user with this Token in the Database", success: false });
    }
}


// export //
module.exports = { verifyJWTToken }