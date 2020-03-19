import axios from 'axios';
import { BaseResponse, ErrorInfo } from '../models';

export default class BaseHttpClient {
  constructor(apiUrl, defaultTimeout, headers) {
    this.config = {
      baseURL: apiUrl,
      timeout: defaultTimeout,
      headers, 
    };
  }

  async get(url) {
    return axios.get(url, this.config).then(this.handleResponse);
  }

  async post(url, data) {
    return axios.post(url, data, this.config).then(this.handleResponse);
  }

  async put(url, data) {
    return axios.put(url, data, this.config).then(this.handleResponse);
  }

  async patch(url, data) {
    return axios.patch(url, data, this.config).then(this.handleResponse);
  }

  async delete(url){
    return axios.delete(url, this.config).then(this.handleResponse);
  }

  handleResponse(response){
    if (!response) {
      return Promise.reject(new BaseResponse(null, new ErrorInfo('No response from server')));
    }

    if (response.status !== 200) {
      return Promise.reject(new BaseResponse(null, new ErrorInfo('Server error')));
    }

    return Promise.resolve(response.data);
  }
}