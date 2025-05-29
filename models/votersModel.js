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
        db.query(`DELETE FROM Voters WHERE ID=${id}`, callback);
    }
}

module.exports = Voters;