const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Category', CategorySchema);
