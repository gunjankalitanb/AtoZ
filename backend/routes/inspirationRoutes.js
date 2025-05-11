const express = require('express');
const {
  extractLinksFromUrl,
  addInspiration,
  getAllInspirations,
  getSingleInspiration,
} = require('../controllers/inspirationController');

const router = express.Router();

// Define routes
router.post('/extract-links', extractLinksFromUrl);
router.post('/inspirations', addInspiration);
router.get('/inspirations', getAllInspirations);
router.get('/inspirations/:slug', getSingleInspiration);

module.exports = router;
