const express = require("express");
const router = express.Router();
const Candidates = require("../models/candidatesModel");

router.get("/", (req, res) => {
    Candidates.getAll((err, rows) => {
        if (err) res.status(500).send(err)
        else res.json(rows, 'rows')
    })
});


module.exports = router;