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

}
