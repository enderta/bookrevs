const bookService = require('./services.js');
const {query} = require("../db.config");

const createBook = async (req, res) => {
    try {
        const {title, author, description, pic_url} = req.body;
        const response = await bookService.createBook(title, author, description, pic_url);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();
        res.json(books);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).send('Server error');
    }
}

const getBookById = async (req, res) => {
    try {
        const response = await bookService.getBookById(req);
        if (response.error) {
            res.status(404).json({ message: response.error });
        } else {
            res.json(response);
        }
    } catch (error) {
        console.log(error.message || error);
    }
}

const updateBook = async (req, res) => {
    try {
        const response = await bookService.updateBook(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const response = await bookService.deleteBook(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}


module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}
