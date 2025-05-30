const express = require("express");
const router = express.Router();
const CandidatesController = require("../controllers/candidatesController");

router.get("/", CandidatesController.getAllCandidates);
router.post('/', CandidatesController.createCandidate);
router.delete('/:id', CandidatesController.deleteCandidate);
router.put('/:id', CandidatesController.updateCandidate);

router.get("/:id", CandidatesController.getSingleCandidate);


module.exports = router;