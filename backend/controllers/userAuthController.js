const Users = require("../models/userAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.userSignup = async (req, res) => {
    const { user_type, user_name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    Users.userSignup(user_type, user_name, email, hashPassword, (err, result) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', data: result });
    });
}

exports.userLogin = async (req, res) => {
    const { user_type, email, password } = req.body;

    Users.userLogin(email, user_type, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
            const token = jwt.sign(
                { id: user.id, email: user.email, user_type: user.user_type },
                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.JWT_EXPIRES_IN || '4h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.user_name,
                    email: user.email,
                    user_type: user.user_type
                }
            });
        });
    });
}

exports.getUsers = (req, res) => {
    const { user_id } = req.query;


    if (user_id) {
        Users.getUserDetailByUserId(user_id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length === 0) {
                return res.status(404).json({ message: 'No voter found' });
            }
            res.status(200).send(result?.[0]);
        })
    }
    else {
        Users.getAll((err, data) => {
            if (err) return res.status(500).send(err);
            else res.send(data, 'users data');
        });
    }

};
