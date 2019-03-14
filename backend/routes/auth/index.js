const express = require('express');

const router = module.exports = express.Router();

router.use('/login', require('./login'));
router.use('/register', require('./register'));
