const db = require("../db");

const Elections = {
    getAll: (callback) => {
        db.query('SELECT * FROM election', callback)
    }
}

module.exports = Elections;