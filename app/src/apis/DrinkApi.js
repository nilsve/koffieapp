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

  updateDrinks(allDrinks) {
    allDrinks.forEach( (drink) => {
      const singleDesc = drink.desc
      return this.putJson(drink.drink, {singleDesc});
    });
  }
}
