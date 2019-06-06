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

  updateDrink(name, desc) {
    return this.putJson(name, {name, desc});
  }
}
