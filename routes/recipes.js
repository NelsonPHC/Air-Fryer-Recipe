'use strict';

const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe'); // model

// creating one
router.post('/', getRecipe(true), async (req, res) => {
  let bod = req.body;
  const recipe = new Recipe({
    name: bod.name,
    description: bod.description,
    temperature: parseInt(bod.temperature),
    timer: parseInt(bod.timer),
    flip: bod.flip
  })

  try {
    const newRecipe = await recipe.save();
    res.status(201).json({ message: `Created recipe for ${newRecipe.name}`});
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
router.get('/:name', getRecipe(), (req, res) => {
  res.json(res.recipe);
})


// updating one
router.patch('/:name', getRecipe(), async (req, res) => {
  let recipe = res.recipe;
  let bod = req.body;
  if (bod.description != null && bod.description != "") recipe.description = bod.description;
  if (bod.temperature != null && bod.temperature != "") recipe.temperature = parseInt(bod.temperature);
  if (bod.timer != null && bod.timer != "") recipe.timer = parseInt(bod.timer);
  if (bod.flip != null) recipe.flip = bod.flip;

  try {
    const updatedRecipe = await recipe.save();
    res.json({ message: `Updated recipe for ${updatedRecipe.name}`});
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
})

// deleting one
router.delete('/:name', getRecipe(), async (req, res) => {
  try {
    await res.recipe.deleteOne();
    res.json({ message: 'Deleted recipe for ' + req.params.name});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

/**
 * middleware for getting recipe by name and error handling
 * @param {boolean} forCreate if the middleware is used for the CREATE endpoint
 */
function getRecipe(forCreate) { // wrap middleware for extra params
  return async (req, res, next) => {

    let recipe;
    let name = req.params.name || req.body.name;
    try {
      recipe = await Recipe.findOne({ name: name});
      if (forCreate) {
        if (recipe !== null) {
          return res.status(400).json({ message: `Recipe for ${name} already exist.`});
        }
      } else {
        if (recipe == null) {
          return res.status(404).json({ message: `Cannot find recipe for ${name}`});
        }
      }

    } catch (err) {
      return res.status(500).json({ message: err.message});
    }

    res.recipe = recipe;
    next();
  };
}

// async function getRecipe(req, res, next) {
//   let recipe;
//   let name = req.params.name;
//   try {
//     recipe = await Recipe.findOne({ name: name});
//     if (recipe == null) {
//       return res.status(404).json({ message: `Cannot find recipe for ${name}`});
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message});
//   }

//   res.recipe = recipe;
//   next();
// }


module.exports = router;