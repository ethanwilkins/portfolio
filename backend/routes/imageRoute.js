const express = require('express');
const Image = require('../models/imageModel');

const router = new express.Router();

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    return res.json(image);
  } catch (err) {
    return res.status(404).send(err);
  }
});

router.post('/upload', async (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    data: req.body.data,
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

module.exports = router;