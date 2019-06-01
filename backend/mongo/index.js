import MongoClient from 'mongodb';

import GroupsCollection from './collections/GroupsCollection';
import OrdersCollection from './collections/OrdersCollection';
import UsersCollection from './collections/UsersCollection';
import DrinksCollection from './collections/DrinksCollection';

const mongo_uri = 'mongodb://localhost:27017';

class Database {
  mongo = null;
  usersCollection = null;
  ordersCollection = null;
  groupsCollection = null;
  drinksCollection = null;

  constructor(mongo) {
    this.mongo = mongo;

    this.usersCollection = new UsersCollection(mongo.collection('users'));
    this.ordersCollection = new OrdersCollection(mongo.collection('orders'));
    this.groupsCollection = new GroupsCollection(mongo.collection('groups'));
    this.drinksCollection = new DrinksCollection(mongo.collection('drinks'));
  }
}

export default MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then(client => {
        return new Database(client.db('koffieapp'));
}).catch(error => console.error(error))
