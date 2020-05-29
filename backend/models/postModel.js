const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  authorId: {
    type: String,
    required: true
  },
  avatarColor: {
    type: Number,
    required: true
  },
  comments: {
    type: [
      {
        commenterId: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  likers: {
    type: [String],
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
