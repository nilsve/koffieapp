import CollectionBase from "./CollectionBase";
import {ObjectId} from 'mongodb';

export default class OrdersCollection extends CollectionBase {
  getAllOrders() {
    return this.collection.find({}).toArray();
  }

  getOrder(orderId) {
    return this.collection.findOne({_id: orderId});
  }

  createOrder(username, drink, milk, sugar, group) {
    const id = new ObjectId();

    return this.collection.insertOne({
      _id: id,
      username,
      drink,
      milk,
      sugar,
      group,
    })
  }
}
