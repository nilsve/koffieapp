import express from 'express';
import MongoClient from '../mongo';

const router = module.exports = express.Router();

router.use(async (req, res, next) => {
  res.locals.db = await MongoClient;

  next();
});
