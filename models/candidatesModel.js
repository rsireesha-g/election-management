const db = require('../db');

const Candidates = {
    getAll: (callback) => {
        db.query('SELECT * FROM candidates', callback);
    },
    createCandidate: (candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, callback) => {
        db.query(`INSERT INTO candidates (candidate_name, aadhar_id, DOB, gender, email, contact_no, address,election_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type], callback)
    },
    deleteCandidate: (id, callback) => {
        db.query(`DELETE FROM candidates WHERE ID=${id}`, callback);
    },
    updateCandidate: (id, data, callback) => {
        const { candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type } = data;
        const sql = `UPDATE candidates SET candidate_name = ?, aadhar_id = ?, DOB = ?, gender = ?, email = ?, contact_no = ?, address = ?,election_type=? WHERE id = ?`;
        db.query(sql, [candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, id], callback);
    },
}

module.exports = Candidates;

