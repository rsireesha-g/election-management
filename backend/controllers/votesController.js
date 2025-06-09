const Votes = require('../models/votesModel');

exports.getAllVotes = (req, res) => {
    Votes.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'votes data');
    })
};


exports.createVote = (req, res) => {
    const data = req.body;
    const { voter_id, candidate_id, election_id } = data;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }
    Votes.createVote(voter_id, candidate_id, election_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Vote created successfully',
            voter: req.body
        });
    });
}

exports.deleteVote = (req, res) => {
    const { id } = req.params;
    Votes.deleteVote(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Vote deleted successfully',
            voter: req.body
        });
    })
}

exports.updateVote = (req, res) => {
    const data = req.body;
    const { id } = req.params;

    for (key in data) {
        if (!data[key]) {
            return res.status(400).json({ error: `Missing ${key}` })
        }
    }
    Votes.updateVote(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: 'Vote updated successfully',
            voter: req.body
        });
    })
}

exports.getSingleVote = (req, res) => {
    const { id } = req.params;

    Votes.getSingleVote(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).send(result)
    })
}



