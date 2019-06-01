import express from 'express';
import {requireAdmin} from '../../auth/middlewares';
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Get all drinks
router.get('/', async (req, res) => {
  const drinks = await res.locals.db.drinksCollection.getAllDrinks();
  const filteredDrinks = drinks.map((drink) => {
    return {
      drink: drink.name,
      desc: drink.desc,
    }
  })
  return res.json(filteredDrinks)
})

module.exports = router
