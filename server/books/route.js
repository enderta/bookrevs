const express = require("express");
const router = express.Router();
const userController = require("./controller");
const verifyToken = require("../middleware/verifyToken");
const cors = require("cors");
const bodyParser = require("body-parser"); // Add this line

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Rest of your code...give cors permission all the routes all origins
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.post('/create', userController.createBook);
router.get('/books', userController.getBooks);
router.get('/book/:id', userController.getBookById);
router.put('/book/:id', userController.updateBook);
router.delete('/book/:id', userController.deleteBook);

module.exports = router;

