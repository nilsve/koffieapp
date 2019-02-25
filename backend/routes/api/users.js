const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;

// Get all users
router.get('/', (req, res) => {
    const collection = req.app.locals.usersCollection
    collection.find({})
        .toArray()
        .then(response => res.status(200)
        .json(response))
        .catch(error => console.error(error))
})

// Get single user
router.get('/:id', (req, res) => {
    const collection = req.app.locals.usersCollection
    collection.findOne({ _id: parseInt(req.params.id) })
        .then(response => res.status(200)
        .json(response))
        .catch(error => console.error(error))
})

// Make new user
router.post('/create', (req, res) => {
    const collection = req.app.locals.usersCollection

    // TODO: Rekening houden met counter van _id kolom?
    collection.insertOne({
        "name"      : req.body.name,
        "email"     : req.body.email,
        "status"    : 'active'
    }).then(response => res.status(200)
        .json(response))
        .catch(error => console.error(error))
})

// Update user
router.put('/update/:id', (req, res) => {
    const collection = req.app.locals.usersCollection
    collection.updateOne(
        { "_id" : parseInt(req.params.id) },
        {
            $set:
            {
                "name" : req.body.name,
                "email": req.body.email
            },
            $currentDate: { lastModified: true }
        }).then(response => res.status(200)
            .json(response))
            .catch(error => console.error(error))
})

// Delete user
router.delete('/delete/:id', (req, res) => {
    const collection = req.app.locals.usersCollection
    collection.deleteOne({ "_id" : parseInt(req.params.id) })
        .then(response => res.status(200)
        .json(response))
        .catch(error => console.error(error))
})

module.exports = router
