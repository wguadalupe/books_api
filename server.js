// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT || 3008; 
const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB:', process.env.MONGO_URI))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

// ROOT ROUTE
app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

// BOOKS ROUTES
const booksController = require('./controllers/books_controllers'); // Make sure this path matches your file structure
app.use('/books', booksController);

// 404 NOT FOUND HANDLER
// This should come after all other route definitions
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// GLOBAL ERROR HANDLER
// This should be the last piece of middleware you use/register
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
