const express = require('express')
const router = express.Router()

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
router.get('/user-group', async (req, res) => {
  let collection = req.app.locals.groupsCollection
  const userinfo = res.locals.userInfo;

  try {
    let response = await collection.findOne({ members: userinfo.username})
    res.status(200).json(response);
  } catch(error) {
    console.log(error)
    res.status(500)
  }
})

// Make new group
router.post('/insert', async (req, res) => {
  let collection = req.app.locals.groupsCollection

  try {
    collection.insertOne({
        _id     : req.body._id,
        name    : req.body._id,
        creator : req.body.member,
        members : [
          req.body.member
        ]
      }
    )
    let response = await collection.findOne({})
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// Add user to group
router.put('/add-user', async (req, res) => {
  let collection = req.app.locals.groupsCollection

  try {
    await collection.updateOne(
      { _id: req.body._id },
      { $addToSet: { members: req.body.member } }
    )
    let response = await collection.findOne({ _id: req.body.id})
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// Remove user from group
router.put('/remove-user', async (req, res) => {
  let collection = req.app.locals.groupsCollection;

  try {
    await collection.updateOne(
      { _id: req.body._id },
      { $pull: { members: req.body.member } }
    )
    let response = await collection.find({}).toArray()
    res.status(200).json(response)
  } catch(error) {
    console.log(error)
    res.status(500)
  }
})

// Delete group
router.post('/delete', async (req, res) => {
    let collection = req.app.locals.groupsCollection;

    try {
        collection.deleteOne({ _id : req.body._id })
        let response = await collection.find({}).toArray()
        res.status(200).json(response)
    } catch(error) {
        console.log(error)
        res.status(500)
    }
})

module.exports = router
