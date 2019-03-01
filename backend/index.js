const express = require('express')
const path = require('path')
const mongo_uri = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(require('./middleware'))

// Handle JSON and encoded URL's
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Use API route
app.use('/', require('./routes'))

// Set static folder --> This has to become React App directory
app.use(express.static(path.join(__dirname, 'public')))

// Look for port number in environment variable, otherwise make it 5000
const PORT = process.env.PORT || 5000

MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
        // const db = client.db('koffieapp')
        // app.locals.usersCollection = usersCollection = db.collection('users')
        app.listen(PORT, () => console.log(`KoffieApp REST API running on port ${PORT}`))
}).catch(error => console.error(error))

// Close MongoDB connection when closing application
process.on('SIGINT', () => {
    MongoClient.close();
    process.exit();
});
