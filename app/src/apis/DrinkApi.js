import BaseApi from './BaseApi';

export default class DrinkApi extends BaseApi {
  constructor() {
    super('drinks')
  }

  getDrinks() {
    return this.getJson('')
  }

  getDrink(name) {
    return this.getJson(name)
  }

  addDrink(drink, desc) {
    return this.postJson('', {drink, desc})
  }

  removeDrink(drink) {
    return this.deleteJson(drink)
  }

  updateDrink(drink) {
    const singleDesc = drink.desc
    return this.putJson(drink.drink, {singleDesc})
  }
}
