const express = require('express');

const router = module.exports = express.Router();

import {register} from '../../auth/loginHelper';

router.post('/', async (req, res, next) => {
  // TODO: DB connectie ofzo
  const {username, password} = req.body;

  await register(username, password);
  res.sendStatus(200);
});
