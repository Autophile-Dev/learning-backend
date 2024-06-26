const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userEmail: {
        type: String,
        unique: true
    },
    phoneNum: {
        type: String,
        unique: true
    },
    age: String,
});
const Users = mongoose.model('Users', userSchema);
module.exports = Users;