const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch(error => {
        console.error("Error connecting to Database:");
        console.error(error);
        process.exit(1);
    })
}