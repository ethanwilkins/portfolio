const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  authorId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    trim: true,
    unique: true,
  },
  body: {
    type: String,
    required: true
  },
  previewText: {
    type: String,
    required: true
  },
  prettyId: {
    type: String,
    required: true,
    unique: true,
  },
  imageName: {
    type: String
  },
  imageData: {
    type: String
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
