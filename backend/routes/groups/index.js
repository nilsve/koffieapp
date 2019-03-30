const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Get all groups
router.get('/', async (req, res) => {
  let collection = req.app.locals.groupsCollection;

  try {
    let response = await collection.find({}).toArray()
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

// Get user's group
router.get('/userGroups', async (req, res) => {
  let collection = req.app.locals.groupsCollection
  const userInfo = res.locals

  console.log('userInfo: ', userInfo)

  try {
    let response = await collection.find({ members: userInfo._id }).toArray()
    res.status(200).json(response);
  } catch(error) {
    console.log(error)
    res.status(500)
  }
})

// Make new group
router.post('/', async (req, res) => {
    let collection = req.app.locals.groupsCollection

    try {
      collection.insertOne( req.body )
      let response = await collection.find({}).toArray()
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500)
    }
})

// Update group
// TODO: ook nog de naam van de groep meenemen
router.put('/:id', async (req, res) => {
    let collection = req.app.locals.groupsCollection

    try {
        await collection.updateOne(
          { _id: req.body._id },
          { $addToSet: { members: req.body.newMember } }
        )
        let response = await collection.find({ _id: req.body.id}).toArray()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// Delete group
router.delete('/:id', async (req, res) => {
    let collection = req.app.locals.groupsCollection;
    let id = ObjectId(req.params.id)

    try {
        collection.deleteOne({ _id : id })
        let allgroups = await collection.find({}).toArray()
        res.status(200).json(allgroups)
    } catch(error) {
        console.log(error)
        res.status(500)
    }
})

module.exports = router
