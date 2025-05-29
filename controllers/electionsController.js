const Elections = require('../models/electionsModel');

exports.getAllElections = (req, res) => {
    Elections.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'elections data');
    });
};


