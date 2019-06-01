import BaseApi from './BaseApi';

export default class DrinkApi extends BaseApi {
  constructor() {
    super('drinks')
  }

  getDrinks() {
    return this.getJson('')
  }


}
