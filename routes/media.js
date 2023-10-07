// package imports //
const express = require("express");
const mongoose = require("mongoose")
const sharp = require("sharp");
const multer = require("multer");
const fs = require("fs");

// other imports //
const router = express.Router();

// post profile image to server //
router.get("/profile/:file/", async (req, res) => {
    res.contentType('image/png');
    const filename = req.params.file

    const path = `./assets/upload/profile_pictures/${filename}.png`

    const filedata = await sharp(path).resize(200).toBuffer()
    res.send(filedata)
})

// export //
module.exports = router