const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;