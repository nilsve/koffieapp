import BaseApi from './BaseApi';

export default class OrderApi extends BaseApi {
  constructor() {
    super('orders')
  }

  getOrder(orderId) {
    return this.getJson(orderId);
  }

  getOrders() {
    return this.getJson('')
  }

  order(drink, milk, sugar, group) {
    return this.postJson('', {drink, milk, sugar, group});
  }
}
