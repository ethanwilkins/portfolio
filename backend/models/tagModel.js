const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema({
  authorId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  prettyId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Tag', TagSchema);
