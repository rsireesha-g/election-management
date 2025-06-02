const express = require("express");
const router = express.Router();
const CandidatesController = require("../controllers/candidatesController");

router.get("/", CandidatesController.getAllCandidates);
router.post('/', CandidatesController.createCandidate);
router.delete('/:id', CandidatesController.deleteCandidate);
router.put('/:id', CandidatesController.updateCandidate);
router.get("/:id", CandidatesController.getCandidateById);

router.get("/election/:election_type", CandidatesController.getCandidateNameByElectionType);
router.get("/countByElection/:election_type", CandidatesController.getCandidatesCountByElectionType)

module.exports = router; 