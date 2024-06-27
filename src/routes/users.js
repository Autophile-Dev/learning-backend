const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Insert data ki api
router.post('/create-user', async (req, res) => {
    try {
        const { firstName, lastName, phoneNum } = req.body;

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            phoneNum
        });
        await newUser.save();
        return res.status(200).json({ userCreated: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update data api
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

})
module.exports = router;