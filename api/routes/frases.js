const express = require('express');
const router = express.Router();
const frasesController = require('../controllers/frasesController');

router.get('/', frasesController.getFrases);
router.post('/', frasesController.addFrase);
router.put('/:id', frasesController.updateFrase);
router.delete('/:id', frasesController.deleteFrase);

module.exports = router;