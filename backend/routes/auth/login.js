const express = require('express');

const router = module.exports = express.Router();

import {login} from '../../auth/loginHelper';

router.post('/', async (req, res, next) => {
  // TODO: DB connectie ofzo
  const {username, password} = req.body;

  try {
    const token = await login(username, password);
    res.json(token);
  } catch (err) {
    res.sendStatus(403);
  }
});
