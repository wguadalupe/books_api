const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema definition:
const bookSchema = new Schema({
  
  title: String,
  description: String,
  year: Number,
  quantity: Number, 
  imageURL: String
});

// Model creation:
const Book = mongoose.model('Book', bookSchema);

// Export the model:
module.exports = Book;
