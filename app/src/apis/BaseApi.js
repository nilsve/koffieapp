import config from 'config';

export default class BaseApi {
  endpoint = null;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async postJson(url, postData) {
    const response = await fetch(`${config.api}/${this.endpoint}/${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData),
    });

    return await response.json();
  }

  async getJson(url) {
    const response = await fetch(`${config.api}/${this.endpoint}/${url}`, {
      method: 'GET',
    });

    return await response.json();
  }
}
