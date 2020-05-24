const express = require('express');
const Image = require('../models/imageModel');

const router = new express.Router();

router.route("/upload")
  .post((req, res, next) => {
    const newImage = new Image({
      postId: "a",
      name: req.body.name,
      data: req.body.data,
      timestamp: new Date().getTime()
    });
    newImage.save()
      .then((result) => {
        res.status(200).json({
          success: true,
          document: result
        });
      })
      .catch((err) => next(err));
  });

module.exports = router;