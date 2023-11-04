'use strict';
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;


// for application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

const recipesRouter = require('./routes/recipes');
app.use('/recipes', recipesRouter);






app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);