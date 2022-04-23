const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, (err) => {
    if (err) throw err
    console.log("Connected to MongoDB")
});

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log("Server running on port : ", PORT)
})