const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    password: String,
    loginCount: Number,
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;