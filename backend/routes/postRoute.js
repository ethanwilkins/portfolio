const express = require('express');
const { ObjectID } = require('mongodb');
const Post = require('../models/postModel');
const multerUpload = require('../config/multer');
const router = new express.Router();

// Get a post by prettyId
router.get('/pretty/:prettyId', async (req, res) => {
  const { prettyId } = req.params;
  try {
    const post = await Post.findOne({prettyId: new RegExp('^'+prettyId+'$', "i")});
    if (post) {
      res.json({ post });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

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
    const newPost = new Post({
      authorId: req.body.authorId,
      title: req.body.title,
      body: req.body.body,
      previewText: req.body.previewText,
      categoryId: req.body.categoryId,
      tags: req.body.tags,
      prettyId: req.body.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(),
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
router.route('/:id')
  .patch(multerUpload.single('imageData'), async (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    try {
      const post = await Post.findById(id);
      const imageName = (req.body.imageName) ? req.body.imageName : (post.imageName ? post.imageName : null);
      const imageData = (req.file) ? req.file.path : (post.imageData ? post.imageData : null);

      return post.updateOne(
        { $set: {
          title: req.body.title,
          body: req.body.body,
          previewText: req.body.previewText,
          prettyId: req.body.title.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(),
          imageName: imageName,
          imageData: imageData
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
