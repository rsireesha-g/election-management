const express = require('express');
const router = express.Router();
const ElectionsController = require('../controllers/electionsController');

router.get('/', ElectionsController.getAllElections);

module.exports = router;