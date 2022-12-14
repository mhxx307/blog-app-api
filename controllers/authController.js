const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("User not found");
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json("Wrong password");
            }

            const { password, ...others } = user._doc;

            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
};

module.exports = authController;
