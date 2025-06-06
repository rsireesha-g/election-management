const db = require("../db");

const Voters = {
    getAll: (callback) => {
        db.query('SELECT * FROM voters', callback);
    },
    createVoter: (voter_name, aadhar_id, DOB, gender, email, contact_no, address, callback) => {
        const sql = `INSERT INTO voters (voter_name, aadhar_id, DOB, gender, email, contact_no, address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [voter_name, aadhar_id, DOB, gender, email, contact_no, address];
        db.query(sql, values, callback);
    },
    updateVoter: (id, data, callback) => {
        const { voter_name, aadhar_id, DOB, gender, email, contact_no, address } = data;
        const sql = `UPDATE voters SET voter_name = ?, aadhar_id = ?, DOB = ?, gender = ?, email = ?, contact_no = ?, address = ? WHERE id = ?`;
        db.query(sql, [voter_name, aadhar_id, DOB, gender, email, contact_no, address, id], callback);
    },
    deleteVoter: (id, callback) => {
        db.query(`DELETE FROM Votes WHERE voter_id=${id}`, (err) => {
            if (err) return callback(err)
            db.query(`DELETE FROM Voters WHERE ID=${id}`, callback);
        });
    },
    getSingleVoter: (id, callback) => {
        db.query(`SELECT * FROM voters WHERE ID=?`, [id], callback)
    },
    getFemaleVotersCountByCandidateId: (candidate_id, callback) => {
        db.query(`
            SELECT voter_name FROM Voters WHERE gender='Female' AND ID IN (
            SELECT voter_id FROM Votes WHERE candidate_id=?
            )`,
            [candidate_id], callback)
    },
    getGenderBasedVoterCount: (callback) => {
        const sql = `SELECT COUNT(*) AS 'No Of Candidates',gender FROM Candidates WHERE election_type='Parliament' GROUP BY gender`;
        db.query(sql, callback)
    },
    getMaleVotersForParliamentElection: (callback) => {
        const sql = `
        SELECT voter_name FROM Voters 
        WHERE gender='Male' 
        AND TIMESTAMPDIFF(YEAR, DOB, CURDATE())>50 
        AND ID IN (
        SELECT voter_id FROM Votes WHERE election_id=1)`;
        db.query(sql, callback)
    }
}

module.exports = Voters;