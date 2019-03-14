import BaseApi from './BaseApi';

export default class AuthApi extends BaseApi {
  constructor() {
    super('auth', false)
  }

  login(username, password) {
    return this.postJson('login', {username, password});
  }
}
