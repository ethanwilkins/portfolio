const express = require('express');
const Image = require('../models/imageModel');
const multerUpload = require('../config/multer');
const router = new express.Router();

// upload new image
router.route("/upload")
  .post(multerUpload.single('imageData'), async (req, res) => {
    const newImage = new Image({
      name: req.body.imageName,
      data: req.file.path,
      timestamp: new Date().getTime()
    });
    try {
      const image = await newImage.save();
      return res.status(200).json({
        success: true,
        image: image
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  });

// get an image to display
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    return res.json(image);
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;