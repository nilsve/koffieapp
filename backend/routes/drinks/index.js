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

// Get single drink
router.get('/:drink', async (req, res) => {
  const drink = await res.locals.db.drinksCollection.getDrink(req.params.drink);
  return res.json(drink);
})

// Update drink
router.put('/:drink', requireAdmin, async (req, res) => {
  console.log(req.params.drink, req.body.singleDesc)
  const drink = await res.locals.db.drinksCollection.updateDrink(req.params.drink, req.body.singleDesc);
  return res.json(drink);
})

module.exports = router
