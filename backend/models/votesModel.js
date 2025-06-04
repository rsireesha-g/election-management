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
    },
    getCountByCandidate: (callback) => {
        const sql = `SELECT COUNT(*) AS 'Count',candidate_id  FROM Votes GROUP BY candidate_id`;
        db.query(sql, callback);
    },
    getCountByCandidateForParliament: (callback) => {
        const sql = `SELECT COUNT(*)  AS 'No Of Votes' FROM Votes 
        WHERE election_id IN  
        (SELECT ID FROM election WHERE election_type='Parliament')`;
        db.query(sql, callback);
    }
}

module.exports = Votes;