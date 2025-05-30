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
    },
    deleteVote: (id, callback) => {
        db.query(`DELETE FROM Votes WHERE ID=${id}`, callback);
    },
    updateVote: (id, data, callback) => {
        const { voter_id, candidate_id, election_id } = data;
        const sql = `UPDATE votes SET voter_id = ?, candidate_id = ?, election_id = ? WHERE ID = ?`;
        db.query(sql, [voter_id, candidate_id, election_id, id], callback);
    },
    getSingleVote: (id, callback) => {
        db.query(`SELECT * FROM votes WHERE ID=${id}`, callback)
    }
}

module.exports = Votes;