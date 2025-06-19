const db = require('../db');

const Candidates = {
    getAll: (callback) => {
        db.query('SELECT * FROM candidates', callback);
    },
    createCandidate: (candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, party, nomination_location, callback) => {
        db.query(`INSERT INTO candidates (candidate_name, aadhar_id, DOB, gender, email, contact_no, address,election_type,party, nomination_location) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
            [candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, party, nomination_location], callback)
    },
    deleteCandidate: (id, callback) => {
        db.query(`DELETE FROM Votes WHERE candidate_id=${id}`, (err) => {
            if (err) return callback(err)

            db.query(`DELETE FROM candidates WHERE id=${id}`, callback);
        })
    },
    updateCandidate: (id, data, callback) => {
        const { candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, party, nomination_location } = data;
        console.log(data, 'data model')
        const sql = `UPDATE candidates SET candidate_name = ?, aadhar_id = ?, DOB = ?, gender = ?, email = ?, contact_no = ?, address = ?,election_type=?, party=?, nomination_location=? WHERE id = ?`;
        db.query(sql, [candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, party, nomination_location, id], callback);
    },
    getCandidateByid: (id, callback) => {
        db.query(`SELECT * FROM candidates WHERE id=${id}`, callback)
    },

    getCandidateNameByElectionType: (election_type, callback) => {
        db.query(`SELECT * FROM candidates WHERE election_type=?`, [election_type], callback);
    },
    getCandidatesCountByElectionType: (callback) => {
        db.query(`SELECT Election.election_type,candidates.candidate_name,COUNT(votes.id) AS 'count'  FROM Candidates 
        JOIN votes ON candidates.id=votes.candidate_id
        JOIN election ON election.id=votes.election_id
        GROUP BY votes.election_id,candidates.candidate_name`, callback)
    },
    getCandidatesAgedForParliament: (callback) => {
        const sql = `SELECT candidate_name FROM Candidates WHERE TIMESTAMPDIFF(YEAR, DOB, CURDATE())>50`;
        db.query(sql, callback)
    },
    getCountByCandidate: (callback) => {
        const sql = `
        SELECT candidates.candidate_name,COUNT(votes.id) AS 'count'  
        FROM Candidates 
        JOIN votes ON candidates.id=votes.candidate_id
        GROUP BY candidates.candidate_name`;
        db.query(sql, callback);
    },

    getCountByCandidateForParliament: (callback) => {
        const sql = `SELECT candidates.candidate_name,COUNT(votes.id)  AS 'count' 
                      FROM candidates
                     JOIN votes WHERE  election_id=1
                     GROUP BY candidate_name`;
        db.query(sql, callback);
    }


}

module.exports = Candidates;

