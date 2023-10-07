const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jwt: { type: String },
    verification: {
        verified_email: { type: Boolean },
        verify_token: { type: String },
    }

})

const User = mongoose.model("User", UserSchema);

module.exports = User