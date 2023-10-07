// package imports
require("dotenv").config({ path: "./.env"});
const express = require('express');
const mongoose = require('mongoose');

// other imports
const Auth = require("./routes/auth");
const Profile = require("./routes/profile");
const Media = require("./routes/media");
const Vocabulary = require("./routes/vocabulary");


const {verifyJWTToken} = require("./middleware");

// reassigning
const app = express();
app.use(express.json())

// connection to DB
async function DBConnect() {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("\x1b[35m Connected with DB \x1b[0m");
}
// call connection method
DBConnect()

app.all("/api/access/*", verifyJWTToken)

app.use("/api/auth", Auth);
app.use("/api/access/profile", Profile);
app.use("/api/media", Media);


// create middleware to check if user is allowed
app.use

// start app
app.listen(process.env.PORT, () => {
    console.log("\x1b[36m Backend has started on 2000\x1b[0m");
})