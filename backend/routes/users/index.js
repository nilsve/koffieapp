const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Get all users
router.get('/', async (req, res) => {
    let collection = req.app.locals.usersCollection;

    try {
        let response = await collection.find({}).toArray()
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})

// Get single user
router.get('/:id', async (req, res) => {
    let collection = req.app.locals.usersCollection
    let id = ObjectId(req.params.id)

    try {
        let response = await collection.findOne({ _id: id })
        res.status(200).json(response)
    } catch(error) {
        console.log(error)
        res.status(500)
    }
})

// Make new user
router.post('/', async (req, res) => {
    let collection = req.app.locals.usersCollection
    let id = new ObjectId()

    try {
        collection.insertOne({
            _id     : id,
            name    : req.body.name,
            email   : req.body.email,
            status  : 'active'
        })
        let allUsers = await collection.find({ _id : id })
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// Update user
router.put('/:id', async (req, res) => {
    let collection = req.app.locals.usersCollection
    let id = ObjectId(req.params.id)

    try {
        await collection.updateOne(
            { _id : id },
            {
                $set:
                {
                    name  : req.body.name,
                    email : req.body.email
                },
                $currentDate: { lastModified: true }
            })
        let user = await collection.find({ _id : id }).toArray()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// Delete user
router.delete('/', async (req, res) => {
    let collection = req.app.locals.usersCollection;

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
