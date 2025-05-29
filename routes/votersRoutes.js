const express = require('express');
const router = express.Router();
const VotersController = require('../controllers/votersController');

router.get('/', VotersController.getAllVoters);
router.post('/', VotersController.createVoter);
// router.patch('/', VotersController.updateVoter);
router.delete('/:id', VotersController.deleteVoter);

module.exports = router;