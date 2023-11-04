const mongoose  = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: ""
  },
  temperature: {
    type: Number,
    required: true
  },
  timer: {
    type: Number,
    required: true
  },
  flip: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Recipe', recipeSchema);