const Candidates = require("../models/candidatesModel");

exports.getAllCandidates = (req, res) => {
    Candidates.getAll((err, data) => {
        if (err) res.status(500).send(err)
        else res.send(data, 'data')
    })
};

exports.createCandidate = (req, res) => {
    const data = req.body;
    const { candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type } = data;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }

    Candidates.createCandidate(candidate_name, aadhar_id, DOB, gender, email, contact_no, address, election_type, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Candidate created successfully',
            Candidate: req.body
        });
    });
};

exports.deleteCandidate = (req, res) => {
    const { id } = req.params;
    Candidates.deleteCandidate(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Candidate deleted successfully',
            voter: req.body
        });
    })
}

