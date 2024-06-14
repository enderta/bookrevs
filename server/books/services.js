/*CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    pic_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

const bcrypt = require("bcrypt");
const pool = require("../db.config");
const jwt = require("jsonwebtoken");
const secret = "secret";

const createBook = async (title, author, description, pic_url) => {
    try {
        const response = await pool.query(
            "insert into books (title, author, description, pic_url) values ($1, $2, $3, $4) returning *;",
            [title, author, description, pic_url]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const getBooks = async () => {
    try {
        const response = await pool.query("SELECT * FROM books");
        return response.rows;
    } catch (error) {
        console.error(error);
    }
}

const getBookById = async (req) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "select * from books where id = $1;",
            [id]
        );
        if (response.rows.length === 0) {
            return { error: "Book not found" };
        } else {
            return response.rows[0];
        }
    } catch (error) {
        console.log(error);
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, author, description, pic_url} = req.body;
        const response = await pool.query(
            "update books set title = $1, author = $2, description = $3, pic_url = $4 where id = $5 returning *;",
            [title, author, description, pic_url, id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "delete from books where id = $1 returning *;",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };