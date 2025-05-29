const express = require('express');
const router = express.Router();
const ElectionsController = require('../controllers/electionsController');

router.get('/', ElectionsController.getAllElections);
router.post('/', ElectionsController.createElection);
router.delete('/:id', ElectionsController.deleteElection);
router.put('/:id', ElectionsController.updateElection);

module.exports = router;