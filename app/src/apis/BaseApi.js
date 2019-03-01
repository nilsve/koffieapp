import config from 'config';

import {loadUserData} from 'auth/authHelpers';

export default class BaseApi {
  endpoint = null;
  requiresAuth = true;
  jwtToken = null;

  constructor(endpoint, requiresAuth = true) {
    this.endpoint = endpoint;
    this.requiresAuth = requiresAuth;
  }

  expandHeadersWithAuth(otherHeaders) {
    let Authorization;
    if (this.requiresAuth) {
      const userData = loadUserData();
      if (!userData) {
        // We hoeven hier niet eens met de server te praten als we al weten dat we niet ingelogd zijn, en de api een login nodig heeft.
        // Hoogst waarschijnlijk een programmeer fout, dit zou niet voor moeten kunnen komen
        const err = {
          status: 403,
          statusText: 'Unauthorized exception',
        }
        
        throw err;
      } else {
        Authorization = userData.jwtToken;
      }
    }

    return {
      ...otherHeaders,
      Authorization,
    }
  }

  async postJson(url, postData) {
    return this._wrapRequest(fetch(`${config.api}/${this.endpoint}/${url}`, {
      method: 'POST',
      headers: this.expandHeadersWithAuth({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(postData),
    }));
  }

  async getJson(url) {
    return this._wrapRequest(fetch(`${config.api}/${this.endpoint}/${url}`, {
      method: 'GET',
      headers: this.expandHeadersWithAuth(),
    }));
  }

  async _wrapRequest(request) {
    try {
      const response = await request;
  
      if (response.ok) {
        return await response.json();
      } else {
        const err = {
          status: response.status,
          statusText: response.statusText,
        }
        
        throw err;
      }
    } catch (err) {
      console.log('Fout opgetreden ', err);
      throw err;
    }
  }
}
