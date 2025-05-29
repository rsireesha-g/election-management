const db = require("../db");

const Elections = {
    getAll: (callback) => {
        db.query('SELECT * FROM election', callback)
    },
    createElection: (election_type, callback) => {
        db.query(
            `INSERT INTO election (election_type) VALUES(?)`,
            [election_type],
            callback
        )
    },
    deleteElection: (id, callback) => {
        db.query(`DELETE FROM election WHERE ID=${id}`, callback);
    }
}

module.exports = Elections;