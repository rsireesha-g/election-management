const express = require('express');
const router = express.Router();
const Votes = require('../models/votesModel');

router.get('/', (req, res) => {
    Votes.getAll((err, rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows, 'rows');
    });
});

module.exports = router;