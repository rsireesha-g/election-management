const Voters = require('../models/votersModel');

exports.getAllVoters = (req, res) => {
    Voters.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'voters data');
    });
};


exports.createVoter = (req, res) => {
    const data = req.body;
    const { voter_name, aadhar_id, DOB, gender, email, contact_no, address } = data;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }

    Voters.createVoter(voter_name, aadhar_id, DOB, gender, email, contact_no, address, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Voter created successfully',
            voter: req.body
        });
    });
};



