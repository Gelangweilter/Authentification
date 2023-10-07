// package imports //
const express = require("express");
const mongoose = require("mongoose")
const sharp = require("sharp");
const multer = require("multer");

// other imports //
const router = express.Router();

const upload = multer({
    dest: '/tmp/',
});

// method one //
router.post('/upload-pages', upload.single('file'), async (req, res) => {
    const imgName = req.userData._id.toHexString();
    console.log(imgName)
    if (!req.file) {
        return res.status(400).json({ success: false, msg: 'No image provided' });
    }

    await sharp(req.file.path).png().toFile(`./assets/upload/vocabulary/${imgName}.png`)

    res.status(200).json({ success: true, msg: 'Image uploaded successfully' });
});