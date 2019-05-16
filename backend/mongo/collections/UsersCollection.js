import CollectionBase from "./CollectionBase";

export default class UsersCollection extends CollectionBase {
  getAllUsers() {
    return this.collection.find({}).toArray();
  }

  getUser(username) {
    return this.collection.findOne({_id: username});
  }

  createUser(username, password) {
    return this.collection.insertOne({
      _id: username,
      name: username,
      password,
      status: 'active',
    });
  }

  setUserAdmin(username, isAdmin) {
    return this.collection.updateOne({
      _id: username
    }, {
      $set: {isAdmin},
    })
  }
}
