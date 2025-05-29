const Candidates = require("../models/candidatesModel");

exports.getAllCandidates = (req, res) => {
    Candidates.getAll((err, data) => {
        if (err) res.status(500).send(err)
        else res.send(data, 'data')
    })
};


