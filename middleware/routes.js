const express = require('express');
const handlers = require('../controller/controller');
const router = express.Router();

//to add a new profile or update it
router.post('/profile', handlers.updateProfile);

//to get profile
router.get('/profile', handlers.getProfile);

// to  get feed
router.get('/feed', handlers.getFeed);

module.exports = router;
