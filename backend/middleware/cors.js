const express = require('express');

const router = module.exports = express.Router();

const cors = {
  origin: '*',
};

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", cors.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
