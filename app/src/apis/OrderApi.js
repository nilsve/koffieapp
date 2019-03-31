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
}
