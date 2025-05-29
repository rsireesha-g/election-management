const Votes = require('../models/votesModel');

exports.getAllVotes = (req, res) => {
    Votes.getAll((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data, 'votes data');
    })
};

