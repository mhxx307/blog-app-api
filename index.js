const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
const categoriesRoute = require("./routes/categoriesRoute");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// connect mongodb
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));

// multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
