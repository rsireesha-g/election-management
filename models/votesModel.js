const db = require("../db");

const Votes = {
    getAll: (callback) => {
        db.query('SELECT * FROM votes', callback)
    },
    createVote: (voter_id, candidate_id, election_id, callback) => {
        db.query(
            `INSERT INTO votes (voter_id, candidate_id, election_id) VALUES(? ,? ,?)`,
            [voter_id, candidate_id, election_id],
            callback)
    }
}

module.exports = Votes;