const express = require('express');
const router = express.Router();
const VotersController = require('../controllers/votersController');

router.get('/', VotersController.getAllVoters);
router.post('/', VotersController.createVoter);
router.put('/:id', VotersController.updateVoter);
router.delete('/:id', VotersController.deleteVoter);

router.get('/:id', VotersController.getSingleVoter);

module.exports = router;