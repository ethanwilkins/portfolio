const express = require('express');
const { ObjectID } = require('mongodb');
const Post = require('../models/postModel');
const multerUpload = require('../config/multer');
const router = new express.Router();

// Get a post by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.json({ post });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// get all posts sorted chronologically
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.status(200).json(posts);
});

// create a new post
router.route('/')
  .post(multerUpload.single('imageData'), async (req, res) => {
    console.log("body: " + JSON.stringify(req.body));
    if (req.body.file) {
      console.log("file: " + JSON.stringify(req.body.file));
    }
    const newPost = new Post({
      authorId: req.body.authorId,
      title: req.body.title,
      body: req.body.body,
      imageName: req.body.imageName,
      imageData: (req.file ? req.file.path : ''),
      timestamp: new Date().getTime()
    });
    try {
      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

// update a post
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    return Post.findByIdAndUpdate(
      id,
      { $set: {
        title: req.body.title,
        body: req.body.body
      }},
      { new: true },
      (err, post) => {
        if (err) return res.status(400).send(err);
        return res.send(post);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

// delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
