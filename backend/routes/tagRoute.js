const express = require('express');
const { ObjectID } = require('mongodb');
const Tag = require('../models/tagModel');
const router = new express.Router();

// Get a tag by prettyId
router.get('/pretty/:prettyId', async (req, res) => {
  const { prettyId } = req.params;
  try {
    const tag = await Tag.findOne({prettyId: new RegExp('^'+prettyId+'$', "i")});
    if (tag) {
      res.json({ tag });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Get a tag by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findById(id);
    if (tag) {
      res.json({ tag });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// get all tags sorted chronologically
router.get('/', async (req, res) => {
  const tags = await Tag.find().sort({ timestamp: 1 });
  res.status(200).json(tags);
});

// create a new tag
router.post('/', async (req, res) => {
    const newTag = new Tag({
      authorId: req.body.authorId,
      name: req.body.name,
      prettyId: req.body.name.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(),
      timestamp: new Date().getTime()
    });
    try {
      const tag = await newTag.save();
      return res.status(201).json(tag);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

// update a tag
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    return Tag.findByIdAndUpdate(
      id,
      { $set: {
        name: req.body.name
      }},
      { new: true },
      (err, tag) => {
        if (err) return res.status(400).send(err);
        return res.send(tag);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

// delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    await tag.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
