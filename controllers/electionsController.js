const Elections = require('../models/electionsModel');

exports.getAllElections = (req, res) => {
    Elections.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'elections data');
    });
};

exports.createElection = (req, res) => {
    const { election_type } = req.body;
    if (!election_type) {
        return res.status(400).json({ error: `Missing election_type` })
    }

    Elections.createElection(election_type, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Election created successfully',
            voter: req.body
        });
    });
}



