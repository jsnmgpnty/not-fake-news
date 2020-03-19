import BaseHttpClient from './BaseHttpClient';

export default class NewsApiClient extends BaseHttpClient {
  constructor (apiUrl, timeout, headers) {
    super(apiUrl, timeout, headers);
  }

  static getInstance() {
    return this.instance;
  }

  static init(apiUrl, timeout, headers) {
    if (!this.instance) {
      this.instance = new NewsApiClient(apiUrl, timeout, headers);
    }

    return this.instance;
  }
}
