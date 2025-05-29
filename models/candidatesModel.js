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
    }
}

module.exports = Candidates;

