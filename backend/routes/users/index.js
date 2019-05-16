import express from 'express';
import {requireAdmin} from '../../auth/middlewares';
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

// Get all users
router.get('/', async (req, res) => {
  const users = await res.locals.db.usersCollection.getAllUsers();
  return res.json(users)
})

// Get single user
router.get('/:username', async (req, res) => {
  const user = await res.locals.db.usersCollection.getUser(req.params.username);
  return res.json(user);
})

// Make user admin
router.put('/:username', requireAdmin, async (req, res) => {
  const user = await res.locals.db.usersCollection.toggleAdmin(req,params.username, req.body.isAdmin);
  return res.json(user);
})

// // Make new user
// router.post('/', async (req, res) => {
//   await res.locals.db.usersCollection.createUser(req.body.username);
// })

// // Update user
// router.put('/:id', async (req, res) => {
//     let collection = req.app.locals.usersCollection
//     let id = ObjectId(req.params.id)

//     try {
//         await collection.updateOne(
//             { _id : id },
//             {
//                 $set:
//                 {
//                     name  : req.body.name,
//                     email : req.body.email
//                 },
//                 $currentDate: { lastModified: true }
//             })
//         let user = await collection.find({ _id : id }).toArray()
//         res.status(200).json(user)
//     } catch (error) {
//         console.log(error)
//         res.status(500)
//     }
// })

// // Delete user
// router.delete('/', async (req, res) => {
//     let collection = req.app.locals.usersCollection;

//     try {
//         collection.deleteOne({ _id : req.body._id })
//         let response = await collection.find({}).toArray()
//         res.status(200).json(response)
//     } catch(error) {
//         console.log(error)
//         res.status(500)
//     }
// })

module.exports = router
