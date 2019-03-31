import express from 'express';
import {requireLogin} from '../auth/middlewares';
const router = module.exports = express.Router();


router.use('/auth', require('./auth'));

// Vanaf dit punt moet je ingelogd zijn
router.use(requireLogin);

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));

