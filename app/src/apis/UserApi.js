import BaseApi from './BaseApi';

export default class UserApi extends BaseApi {
  constructor() {
    super('users')
  }

  getUser(userId) {
    return this.getJson(userId);
  }

  getUsers() {
    return this.getJson('')
  }

  setUserAdmin(username, isAdmin) {
    return this.putJson(username, isAdmin);
  }
}
