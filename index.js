const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
const port = 5000;

// connect mongodb
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => {
    res.send("Working!");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
