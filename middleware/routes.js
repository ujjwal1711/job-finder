const express = require('express');
const handlers = require('../controller/controller');
const router = express.Router();

//to add a new profile
router.post('/profile', handlers.updateProfile);

//to get profile
router.get('/profile', handlers.getProfile);

module.exports = router;
