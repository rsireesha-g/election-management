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
        db.query(`DELETE FROM Votes WHERE election_id=${id}`, (err) => {
            if (err) return callback(err)
            db.query(`DELETE FROM election WHERE ID=${id}`, callback);
        })
    },
    updateElection: (id, election_type, callback) => {
        db.query(`UPDATE election SET election_type=? WHERE ID=?`, [election_type, id], callback)
    },
    getSingleElectionType: (id, callback) => {
        db.query(`SELECT * FROM election WHERE ID=${id}`, callback)
    }
}

module.exports = Elections;