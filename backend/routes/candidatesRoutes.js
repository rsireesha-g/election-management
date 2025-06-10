const express = require("express");
const router = express.Router();
const CandidatesController = require("../controllers/candidatesController");

router.get("/", CandidatesController.getAllCandidates);
router.post('/', CandidatesController.createCandidate);
router.delete('/:id', CandidatesController.deleteCandidate);
router.put('/:id', CandidatesController.updateCandidate);
router.get("/:id", CandidatesController.getCandidateById);

router.get("/election/:election_type", CandidatesController.getCandidateNameByElectionType);
router.get("/count/byCandidate/byElection", CandidatesController.getCandidatesCountByElectionType);
router.get('/parliament/count/byCandidate', CandidatesController.getCountByCandidateForParliament);
router.get('/count/byCandidate', CandidatesController.getCountByCandidate);
router.get("/parliament/agedCandidates", CandidatesController.getCandidatesAgedForParliament)


module.exports = router; 