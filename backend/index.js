const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))