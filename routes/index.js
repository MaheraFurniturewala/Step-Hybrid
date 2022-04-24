const express = require('express');
const router = express.Router();
const { Home } = require('../controllers/Home');

router.get('/home', Home);

module.exports = router
