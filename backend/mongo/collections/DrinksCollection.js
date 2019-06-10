import CollectionBase from "./CollectionBase";

export default class DrinksCollection extends CollectionBase {
  getAllDrinks() {
    return this.collection.find({}).toArray();
  }

  createDrink(drink, desc) {
    return this.collection.insertOne({
      _id: drink,
      name: drink,
      desc: desc,
    });
  }

  getDrink(drink) {
    return this.collection.findOne({_id: drink});
  }

  deleteDrink(drink) {
    return this.collection.deleteOne({
      _id: drink
    })
  }

  updateDrink(drink, desc) {
    return this.collection.updateOne({
      _id: drink
    }, {
      $set: {desc},
    })
  }
}
