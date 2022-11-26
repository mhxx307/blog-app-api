const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");

app.use(express.json());
app.use(cors());
dotenv.config();
const port = 5000;

// connect mongodb
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(process.env.MONGODB_URL, options)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));
