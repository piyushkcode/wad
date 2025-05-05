const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add a new book
router.post('/add', async (req, res) => {
    try {
      const data = req.body;
  
      // Check if the request body is an array (multiple books)
      if (Array.isArray(data)) {
        const books = await Book.insertMany(data);
        res.status(201).json({ message: 'Books added successfully', books });
      } else {
        // Single book
        const newBook = new Book(data);
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
      }
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated', book: updatedBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
