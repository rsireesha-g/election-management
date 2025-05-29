const db = require("../db");

const Voters = {
    getAll: (callback) => {
        db.query('SELECT * FROM voters', callback)
    }
}

module.exports = Voters;