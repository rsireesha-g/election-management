const express = require('express');
const router = express.Router();
const ElectionsController = require('../controllers/electionsController');

router.get('/', ElectionsController.getAllElections);
router.post('/', ElectionsController.createElection);

module.exports = router;