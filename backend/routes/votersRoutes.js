const express = require('express');
const router = express.Router();
const VotersController = require('../controllers/votersController');

router.get('/', VotersController.getAllVoters);
router.post('/', VotersController.createVoter);
router.put('/:id', VotersController.updateVoter);
router.delete('/:id', VotersController.deleteVoter);

// router.get('/:id', VotersController.getSingleVoter);

router.get("/femaleVotersCountByCandidateId/:candidate_id", VotersController.getFemaleVotersByCandidateId);
router.get('/parliamentElection/genderBasedVoterCount', VotersController.getGenderBasedVoterCount);
router.get("/parliamentElection/maleVoters", VotersController.getMaleVotersForParliamentElection);

module.exports = router;