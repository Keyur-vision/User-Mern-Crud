const User = require("../model/userSchema");
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    try {
        const data = await User.find();
        return res.status(200).json({ status: true, data: data, message: "Users get successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getLoginUser = async (req, res) => {
    try {
        const data = await User.find({ lastLogin: { $ne: null } });
        return res.status(200).json({ status: true, data: data, message: "Users get successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const singleUser = async (req, res) => {
    try {
        const item = await User.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const data = await User.create({ ...req.body, password: password });
        return res.status(201).json({ status: true, data: data, message: "User created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editUser = async (req, res) => {
    try {

        const findUser = await User.findOne({ _id: req.params.id });
        if (findUser) {
            findUser.profile = req.file ? req.file.path : null;
        }

        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastLogin =  req.body.lastLogin === "null" ? null : req.body.lastLogin;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, lastLogin:lastLogin, updatedAt: Date.now()});
        return res.status(200).json({ status: true, data: updatedUser, message: "User updated successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        return res.status(200).json({ status: true, data: [], message: "User deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getUser,
    getLoginUser,
    addUser,
    editUser,
    deleteUser,
    singleUser
}



