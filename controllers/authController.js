const User = require("../models/User");

const authController = {
    register: async (req, res) => {
        try {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = authController;
