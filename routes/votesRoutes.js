const express = require('express');
const router = express.Router();
const VotesController = require('../controllers/votesController');

router.get('/', VotesController.getAllVotes);
router.post('/', VotesController.createVote);

module.exports = router;