// Configure project and import dependencies

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5051
// const MONGO_URI = "mongodb+srv://waleedzaheer55:mORxmKA29Cu2K3CI@learning-mern.ckdevt2.mongodb.net/?retryWrites=true&w=majority&appName=learning-mern"
const MONGO_URI="mongodb://localhost:27017"
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRoute = require('./src/routes/users');
// Cluster string
// mongodb+srv://waleedzaheer55:mORxmKA29Cu2K3CI@learning-mern.ckdevt2.mongodb.net/

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
// https://localhost:5051/user/create-user
// https://localhost:5051/user/update-user/
// https://localhost:5051/user/delete-user/
// https://localhost:5051/user/all-user
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Authentication & Authorization API's
// 1 - Updating Create user api and Schema
// 2 - Create Login API