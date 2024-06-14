const revService = require('./service.js');
const {query} = require("../db.config");

const createReview = async (req, res) => {
    try {
        const {book_id, user_id, review_text, rating} = req.body;
        const response = await revService.createReview(book_id, user_id, review_text, rating);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await revService.getReviews();
        res.json(reviews);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).send('Server error');
    }
}

const getReviewById = async (req, res) => {
    try {
        const response = await revService.getReviewById(req);
        if (response.error) {
            res.status(404).json({ message: response.error });
        } else {
            res.json(response);
        }
    } catch (error) {
        console.log(error.message || error);
    }
}

const updateReview = async (req, res) => {
    try {
        const response = await revService.updateReview(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const deleteReview = async (req, res) => {
    try {
        const response = await revService.deleteReview(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}


module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
}
