const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "YellowTree"
// Insert data ki api
router.post('/create-user', async (req, res) => {
    try {
        const { firstName, lastName, phoneNum, password } = req.body;
        const user = await User.findOne({ phoneNum });
        if (user) {
            res.status(400).json({ message: 'User with this mobile number is already existing' });
        }
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            phoneNum,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(200).json({ userCreated: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login API
// router.post('/login-user', async (req, res) => {
//     try {
//         const { phoneNum, password } = req.body;
//         const user = await User.findOne({ phoneNum });
//         if (!user) {
//             res.status(404).json({ message: 'User with this mobile number is not existing. Create new account.' });
//         }
//         // Crack the password here and let the user to login and access the app
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             res.status(400).json({ message: 'Incorrect Password' });
//         }
//         // Assigning the Token and Send the user data
//         const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
//         return res.status(200).json({ user: user, token })
//     }
//     catch (error) {

//     }
// })









// Update data api

router.post('/user-login', async (req, res) => {
    try {
        // login with phone number
        const { phoneNum, password } = req.body;

        // check if user exists or not
        const user = await User.findOne({ phoneNum });
        if (!user) {
            return res.status(400).send({ message: 'User does not exists' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: 'Password is incorrect' })
        }
        

        // Assign token to user
        const token = jwt.sign({ _id: user._id }, SECRET_KEY);
        return res.status(200).send({ user: user, token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

router.put('/update-user/:id', async (req, res) => {
    try {
        // 667d7cc613cc42d668298767 => req.params
        const { id } = req.params;

        const { firstName, lastName, phoneNum } = req.body;
        const updateUser = await User.findByIdAndUpdate(
            id, {
            firstName,
            lastName,
            phoneNum
        }
            , { new: true }
        )
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ userUpdate: updateUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// delete data api
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Get all data from database
router.get('/all-user', async (req, res) => {
    try {
        const allUsers = await User.find();
        if (!allUsers) {
            return res.status(200).json({ message: 'Database is empty, No record in database' });
        }
        return res.status(200).json({ users: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve specific user information
router.get('/specific-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const specificUser = await User.findById(id);
        if (!specificUser) {
            return res.status(404).json({ message: 'This specific user does not exists' });
        }
        return res.status(200).json({ user: specificUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router;