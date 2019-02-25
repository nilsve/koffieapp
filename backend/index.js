const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')
const mongo_uri = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient

const app = express()

// Logger
app.use(logger)

// Handle JSON and encoded URL's
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Use API route
app.use('/api/users', require('./routes/api/users'))

// Set static folder --> This has to become React App directory
app.use(express.static(path.join(__dirname, 'public')))

// Look for port number in environment variable, otherwise make it 5000
const PORT = process.env.PORT || 5000

MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
        const db = client.db('koffieapp')
        app.locals.usersCollection = usersCollection = db.collection('users')
        app.listen(PORT, () => console.log(`KoffieApp REST API running on port ${PORT}`))
}).catch(error => console.error(error))

process.on('SIGINT', () => {
    MongoClient.close();
    process.exit();
});
