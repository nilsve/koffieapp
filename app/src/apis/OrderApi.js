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

  order(pick, milk, sugar, group) {
    return this.postJson('', {pick, milk, sugar, group});
  }
}
