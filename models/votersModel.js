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
    // updateVoter: () => {

    // },
    deleteVoter: (id, callback) => {
        db.query(`DELETE FROM Voters WHERE ID=${id}`, callback);
    }
}

module.exports = Voters;