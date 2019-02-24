const express = require('express')
const router = express.Router()

const users = [
    {
        id: 1,
        name: 'Indy Maat',
        email: 'i.maat@student.fontys.nl',
        status: 'active'
    },
    {
        id: 2,
        name: 'Nils van Eijk',
        email: 'n.v.eijk@student.fontys.nl',
        status: 'active'
    },
    {
        id: 3,
        name: 'Marck Vincent',
        email: 'm.vincent@student.fontys.nl',
        status: 'active'
    }
]

// Get all users
router.get('/', (req, res) => {
    res.json(users)
})

// Get single user
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ 'Bad request': `No user with id: ${req.params.id}`})
    }
})

// Make new user
router.post('/', (req, res) => {
    const newuser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    console.log(newuser.name)
    console.log(newuser.email)

    if (!newuser.name || !newuser.email) {
        res.status(400).json({ "Missing information": "Please enter a name and email"})
    }
    users.push(newuser)
    res.json(users)
})

// Update user
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name,
                user.email = updUser.email ? updUser.email : user.email

                res.json({"User updated": users})
            }
        })
    } else {
        res.status(400).json({ "User does not exist" : `No user with id: ${req.params.id}`})
    }
})

module.exports = router