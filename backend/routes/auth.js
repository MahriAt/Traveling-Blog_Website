const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/create", async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashedPassword
        });

        const result = await user.save();

        res.status(201).json({
            message: "Author created",
            userId: result._id,
            password: result.password,
            username: result.username
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        const passwordIsCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordIsCorrect) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }

        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Authentication successful",
            token: token
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
});
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id}).exec().then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;