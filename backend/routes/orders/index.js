const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Get all orders
router.get('/', async (req, res) => {
    let collection = req.app.locals.ordersCollection;

    try {
        let response = await collection.find({}).toArray();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})

// Get single order
router.get('/:id', async (req, res) => {
    let collection = req.app.locals.ordersCollection
    let id = ObjectId(req.params.id)

    try {
        let response = await collection.findOne({ _id: id })
        res.status(200).json(response)
    } catch(error) {
        console.log(error)
        res.status(500)
    }
})

// Make new order
router.post('/', async (req, res) => {
    let collection = req.app.locals.ordersCollection
    let id = new ObjectId()

    try {
        collection.insertOne({
            _id     : id,
            name    : req.body.name,
            email   : req.body.email,
            status  : 'active'
        })
        let allOrders = await collection.find({ _id : id }).toArray()
        res.status(200).json(allOrders)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// Update order
router.put('/:id', async (req, res) => {
    let collection = req.app.locals.ordersCollection
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
        let order = await collection.find({ _id : id }).toArray()
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// Delete order
router.delete('/:id', async (req, res) => {
    let collection = req.app.locals.ordersCollection;
    let id = ObjectId(req.params.id)

    try {
        collection.deleteOne({ _id : id })
        let allOrders = await collection.find({}).toArray()
        res.status(200).json(allOrders)
    } catch(error) {
        console.log(error)
        res.status(500)
    }
})

module.exports = router
