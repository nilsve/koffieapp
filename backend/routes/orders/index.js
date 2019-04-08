const express = require('express')
const router = express.Router()

// Get all orders
router.get('/', async (req, res) => {
  const orders = await res.locals.db.ordersCollection.getAllOrders();
  return res.json(orders);
})

// Get single order
router.get('/:id', async (req, res) => {
  let id = ObjectId(req.params.id)

  const order = await res.locals.db.ordersCollection.getOrder(id);
  return res.json(order);
})

// Make new order
router.post('/', async (req, res) => {
  const {username} = res.locals.userInfo
  const {drink, milk, sugar} = req.body;
  const group = await res.locals.db.groupsCollection.findUserGroup(username);
  await res.locals.db.ordersCollection.createOrder(username, drink, milk, sugar, group.name);
  const allOrders = await res.locals.db.ordersCollection.getAllOrders();
  return res.json(allOrders)
})

// // Update order
// router.put('/:id', async (req, res) => {
//   let collection = req.app.locals.ordersCollection
//   let id = ObjectId(req.params.id)

//   try {
//     await collection.updateOne(
//       {_id: id},
//       {
//         $set:
//         {
//           name: req.body.name,
//           email: req.body.email
//         },
//         $currentDate: {lastModified: true}
//       })
//     let order = await collection.find({_id: id}).toArray()
//     res.status(200).json(order)
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })

// // Delete order
// router.delete('/:id', async (req, res) => {
//   let collection = req.app.locals.ordersCollection;
//   let id = ObjectId(req.params.id)

//   try {
//     collection.deleteOne({_id: id})
//     let allOrders = await collection.find({}).toArray()
//     res.status(200).json(allOrders)
//   } catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// })

module.exports = router
