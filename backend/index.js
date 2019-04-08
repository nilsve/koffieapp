import express from 'express';
import path from 'path';

import mongo from './mongo';

const app = express()

const PORT = process.env.PORT || 5000

app.use(require('./middleware'))

// Handle JSON and encoded URL's
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Use API route
app.use('/', require('./routes'))

// Set static folder --> This has to become React App directory
app.use(express.static(path.join(__dirname, 'public')))

// Look for port number in environment variable, otherwise make it 5000

async function startServer() {
  const db = await mongo;

  app.locals.db = db;
  
  app.listen(PORT, () => console.log(`KoffieApp REST API running on port ${PORT}`));
}

startServer();

// Close MongoDB connection when closing application
process.on('SIGINT', () => {
    MongoClient.close();
    process.exit();
});
