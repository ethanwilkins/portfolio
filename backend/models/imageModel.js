const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  name: {
    type: String,
    default: "none",
    required: true
  },
  data: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Image', ImageSchema);
