const express = require('express');

const router = module.exports = express.Router();

router.post('/', async (req, res, next) => {
  // TODO: DB connectie ofzo
  console.log(req.body);
});
