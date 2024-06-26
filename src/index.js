// Configure project and import dependencies

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5051
const MONGO_URI = "mongodb+srv://waleedzaheer55:mORxmKA29Cu2K3CI@learning-mern.ckdevt2.mongodb.net/?retryWrites=true&w=majority&appName=learning-mern"
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./routes/users');

// Middleware to parse incoming or outgoing JSON format data
app.use(cors());
app.use(express.json());

// COnnect with MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDb');
}).catch((err) => {
    console.log(`MongoDb connection error`, err);
});

// Creating routes
app.use('/auth/users', userRoute);
// https://localhost:5051/user/add-user
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});