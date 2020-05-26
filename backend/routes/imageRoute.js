const express = require('express');
const multer = require('multer');
const Image = require('../models/imageModel');

const router = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.route("/upload")
  .post(upload.single('imageData'), async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    return res.json(image);
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;