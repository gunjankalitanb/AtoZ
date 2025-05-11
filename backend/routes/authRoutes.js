
const express = require('express');
const router = express.Router();
const registerHandler = require('../api/auth/register');
const loginHandler = require('../api/auth/login');

router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;
