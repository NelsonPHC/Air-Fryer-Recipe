const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
// creating one
router.post('/', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    temperature: parseInt(req.body.temperature),
    timer: parseInt(req.body.timer),
    flip: req.body.flip
  })

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
})

// getting all
router.get('/', async (req, res) => {
  try {
    const recipe = await Recipe.find();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

// getting one
router.get('/:name', async (req, res) => {

})


// updating one
router.patch('/:name', (req, res) => {

})

// deleting one
router.delete('/:name', (req, res) => {

})


module.exports = router;