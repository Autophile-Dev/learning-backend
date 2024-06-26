const express = require('express');
const router = express.Router();

const Users = require('../models/User');
router.post('/create-user', async (req, res) => {
    try {
        // Code to register a new user based on req.body
        const { firstName, lastName, userEmail, phoneNum, age } = req.body;

        // check if email exists or not 
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // create a new admin
        const newUser = new Users({
            firstName,
            lastName,
            userEmail,
            phoneNum,
            age
        });
        await newUser.save();


        return res.status(200).send({ userCreated: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server Error' });
    }
});
module.exports = router;