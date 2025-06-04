const Candidates = require('../models/candidatesModel');
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

exports.deleteElection = (req, res) => {
    const { id } = req.params;
    Elections.deleteElection(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Election type deleted successfully',
            voter: req.body
        });
    })
}

exports.updateElection = (req, res) => {
    const { id } = req.params;
    const { election_type } = req.body;
    if (!election_type) {
        return res.status(400).json({ error: `Missing election_type` })
    }

    Elections.updateElection(id, election_type, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Election data updated successfully',
            voter: req.body
        });
    })
}

exports.getSingleElectionType = (req, res) => {
    const { id } = req.params;

    Elections.getSingleElectionType(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).send(result)
    })
}

