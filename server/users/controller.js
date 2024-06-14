const userService = require('./service');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userService.registerUser(username, email, password);
    res.json(user);
};

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req);
    if (user.error) {
        res.status(404).json(user);
    } else {
        res.json(user);
    }
};

const updateUser = async (req, res) => {
    await userService.updateUser(req, res);
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req, res);
};

const loginUser = async (req, res) => {
    const userData = req.body;
    const response = await userService.loginUser(userData);
    if (response.status === 'error') {
        res.status(401).json(response);
    } else {
        res.json(response);
    }
};

module.exports = {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};