const express = require('express');
const router = express.Router();
const Voters = require('../models/votersModel');

router.get('/', (req, res) => {
    Voters.getAll((err, rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows, 'rows');
    });
});

module.exports = router;