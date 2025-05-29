const express = require('express');
const router = express.Router();
const VotesController = require('../controllers/votesController');

router.get('/', VotesController.getAllVotes);

module.exports = router;