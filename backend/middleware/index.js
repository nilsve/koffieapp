const express = require('express');

const router = module.exports = express.Router();

router.use(require('./cors'));
router.use(require('./logger'));
router.use(require('./mongo'));
