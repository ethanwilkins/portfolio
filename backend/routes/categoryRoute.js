const express = require('express');
const { ObjectID } = require('mongodb');
const Category = require('../models/categoryModel');
const router = new express.Router();

// Get a category by prettyId
router.get('/pretty/:prettyId', async (req, res) => {
  const { prettyId } = req.params;
  try {
    const category = await Category.findOne({prettyId: new RegExp('^'+prettyId+'$', "i")});
    if (category) {
      res.json({ category });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Get a Category by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (category) {
      res.json({ category });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// get all categories sorted chronologically
router.get('/', async (req, res) => {
  const categories = await Category.find().sort({ timestamp: 1 });
  res.status(200).json(categories);
});

// create a new category
router.post('/', async (req, res) => {
    const newCategory = new Category({
      authorId: req.body.authorId,
      name: req.body.name,
      prettyId: req.body.name.replace(/^\s+/g, '').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(),
      timestamp: new Date().getTime()
    });
    try {
      const category = await newCategory.save();
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

// update a category
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    return Category.findByIdAndUpdate(
      id,
      { $set: {
        name: req.body.name
      }},
      { new: true },
      (err, category) => {
        if (err) return res.status(400).send(err);
        return res.send(category);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

// delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
