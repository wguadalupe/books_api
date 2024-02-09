// Require Express and set up the router
const express = require('express');
const booksRoute = express.Router();

// Require the Books model
const Books = require('../models/books');

// GET all books
booksRoute.get('/', (req, res) => {
    Books.find({})
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ message: 'Error fetching books', error: err }));
});

// GET a single book by ID
booksRoute.get('/:id', (req, res) => {
    const { id } = req.params;

    Books.findById(id)
        .then(book => {
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch(err => {
            if (err.name === 'CastError') {
                res.status(400).json({ message: 'Invalid ID format', error: err });
            } else {
                res.status(500).json({ message: 'Error fetching book', error: err });
            }
        });
});

// POST a new book
booksRoute.post('/', (req, res) => {
    Books.create(req.body)
        .then(newBook => res.status(201).json(newBook))
        .catch(err => res.status(500).json({ message: 'Error creating book', error: err }));
});

// PATCH to update a book by ID
booksRoute.patch('/:id', (req, res) => {
    const { id } = req.params;

    Books.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then(updatedBook => {
            if (updatedBook) {
                res.json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error updating book', error: err }));
});

// DELETE a book by ID
booksRoute.delete('/:id', (req, res) => {
    const { id } = req.params;

    Books.findByIdAndDelete(id)
        .then(deletedBook => {
            if (deletedBook) {
                res.json({ message: 'Book successfully deleted' });
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error deleting book', error: err }));
});

// Export the router
module.exports = booksRoute;
