const express = require('express');
const router = express.Router();
const VotersController = require('../controllers/votersController');

router.get('/', VotersController.getAllVoters);
router.post('/', VotersController.createVoter);

module.exports = router;