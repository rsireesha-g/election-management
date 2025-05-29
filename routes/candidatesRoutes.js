const express = require("express");
const router = express.Router();
const CandidatesController = require("../controllers/candidatesController");

router.get("/", CandidatesController.getAllCandidates);


module.exports = router;