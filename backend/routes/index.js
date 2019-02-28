const express = require('express');

const router = module.exports = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
