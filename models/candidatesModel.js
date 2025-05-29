const db = require('../db');

const Candidates = {
    getAll: (callback) => {
        db.query('SELECT * FROM candidates', callback);
    }
}

module.exports = Candidates;

