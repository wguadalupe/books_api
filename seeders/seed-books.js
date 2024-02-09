const mongoose = require('mongoose');
const Book = require('../models/books'); // Adjust the path as necessary
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    seedBooks();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit in case of connection error
  });

const booksData = [
    {
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }
];

async function seedBooks() {
    try {
      await Book.deleteMany({});
      const seededBooks = await Book.insertMany(booksData);
      console.log('Books seeded successfully', seededBooks);
    } catch (error) {
      console.error('Error seeding books:', error);
    } finally {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0); // Ensure the process exits after seeding
      });
    }
  }