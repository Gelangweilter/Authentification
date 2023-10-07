// package imports //
const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemes/userScheme");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const Generate = require("../generator");
const nodemailer = require('nodemailer');
const SendEmail = require("../email");

// other imports //
const router = express.Router();


// Register //
router.post("/register", async (req, res) => {
    const body = req.body;
    console.log(body);

    // looking for User
    const checkUserName = await User.findOne({ username: body.username });
    if(checkUserName) return res.status(201).json({ msg: "Username already in database", content: "none", success: false });

    // looking for the email in the Database
    const checkEmail = await User.findOne({ email: body.email })
    if(checkEmail) return res.status(201).json({ msg: "Email already in database", content: "none", success: false });

    // if both is true => create an account with data
    // hashing the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // creating JsonWebToken
    const accessToken = jsonWebToken.sign({
        username: body.username,
        email: body.email,
    }, process.env.JWT);

    // call function Generate() in generator.js for email-token
    const token = Generate(48);

    // create account
    const createAccount = await User.create({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        jwt: accessToken,
        verification: {
            first_login: false,
            verified_email: false,
            verify_token: token,
        }
    });

    SendEmail(body.email, token);

    if(!createAccount) return res.status(201).json({ msg: "Error while creating your account", content: "none", success: false });

    res.status(200).json({ msg: "Account was created and email was sent", content: accessToken, success: true });
});

// Login //
router.post("/login", async (req, res) => {
    const body = req.body;

    const checkUser = await User.findOne({ email: body.email });
    if (!checkUser) return res.status(201).json({ msg: "User not found", success: false });

    const matchPasswords = await bcrypt.compare(body.password, checkUser.password);
    if (!matchPasswords) return res.status(201).json({ msg: "Passwords do not match", success: false });

    res.status(201).json({ msg: "Login successful", content: checkUser.jwt, success: true });
});

// Verify Email //
router.get("/verify/:id", async (req, res) => {

    // extract the token from the URL
    const token = req.params.id;
    //console.log(token); debug

    // checking if user with this token exists
    const findUserByToken = await User.findOne({ 'verification.verify_token': token });
    if (!findUserByToken) return res.status(201).send(`Could not find your token`);

    // set the boolean "verified_email" to true
    const verifyUser = await User.updateOne({ 'verification.verify_token': token }, { 'verification.verified_email': true })
    if (!verifyUser) return res.status(201).send(`Could not update value`);

    res.status(200).send(`Updated successfully`);
});

// Delete Account //
router.get("/delete/:id", async (req, res) => {

    // extract the token from the URL
    const token = req.params.id;
    //console.log(token); debug

    // checking if user with this token exists
    const findUserByToken = await User.findOne({ 'verification.verify_token': token });
    if (!findUserByToken) return res.status(201).send(`Could not find your token`);

    // set the boolean "verified_email" to true
    const verifyUser = await User.deleteOne({ 'verification.verify_token': token })
    if (!verifyUser) return res.status(201).send(`Could not delete your account`);

    res.status(200).send(`Your account was successfully deleted`)
});


// export //
module.exports = router