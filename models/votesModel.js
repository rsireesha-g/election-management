const db = require("../db");

const Votes = {
    getAll: (callback) => {
        db.query('SELECT * FROM votes', callback)
    }
}

module.exports = Votes;