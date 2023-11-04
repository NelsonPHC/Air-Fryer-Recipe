const express = require('express');
const app = express();

const router = express.Router();
const Recipe = require('../models/recipe');
const multer = require('multer');

// for application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module


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
// router.get('/', async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (err) {
//     res.status(500).json({ message: err.message});
//   }
// })

// getting one
router.get('/:name', getRecipe, (req, res) => {
  res.json(res.recipe);
})


// updating one
router.patch('/:name', getRecipe, async (req, res) => {
  let recipe = res.recipe;
  let bod = req.body;
  if (bod.description != null) recipe.description = bod.description;
  if (bod.temperature != null) recipe.temperature = parseInt(bod.temperature);
  if (bod.timer != null) recipe.timer = parseInt(bod.timer);
  if (bod.flip != null) recipe.flip = bod.flip;

  try {
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
})

// deleting one
router.delete('/:name', getRecipe, async (req, res) => {
  try {
    await res.recipe.deleteOne();
    res.json({ message: 'Deleted recipe'});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findOne({ name: req.params.name});
    if (recipe == null) {
      return res.status(404).json({ message: "Cannot find recipe"});
    }
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }

  res.recipe = recipe;
  next();
}


module.exports = router;