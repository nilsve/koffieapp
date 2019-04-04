const MongoClient = require('mongodb').MongoClient
const mongo_uri = 'mongodb://localhost:27017';

class Database {
  mongo = null;
  usersCollection = null;
  groupsCollection = null;

  constructor(mongo) {
    this.mongo = mongo;

    this.usersCollection = mongo.collection('users');
    this.groupsCollection = mongo.collection('groups');
  }
}

export default MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
        return new Database(client.db('koffieapp'));
}).catch(error => console.error(error))
