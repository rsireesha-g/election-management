const db = require("../db");

const Users = {
    userSignup: (user_type, user_name, email, hashPassword, callback) => {
        db.query(`SELECT *  FROM users WHERE email=?`, [email], (err, results) => {
            if (err) return callback(err);
            if (results?.length > 0) {
                return callback(new Error('Email already exists!'))
            }
            db.query(`
            INSERT INTO users (user_type,user_name,email,password) VALUES (?, ?, ?, ? )`,
                [user_type, user_name, email, hashPassword],
                callback
            );
        });

    },
    userLogin: (email, user_type, callback) => {
        db.query(`SELECT * FROM users WHERE email = ? AND user_type= ?`, [email, user_type], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, null);
            return callback(null, results[0]);
        });

    }
};

module.exports = Users;