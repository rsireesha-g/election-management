const Voters = require('../models/votersModel');

exports.getAllVoters = (req, res) => {
    Voters.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'voters data');
    });
};

