import axios from 'axios';
import { BaseResponse, ErrorInfo } from '../models';

export default class BaseHttpService {
  constructor(apiUrl, defaultTimeout) {
    this.config = {
      baseURL: this.apiUrl,
      timeout: this.defaultTimeout,
    };
  }

  async get(url) {
    return axios.get(url, this.config).then(this.handleResponse);
  }

  async post(url, data) {
    return axios.post(url, data, this.config).then(r => this.handleResponse(r));
  }

  async put(url, data) {
    return axios.put(url, data, this.config).then(r => this.handleResponse(r));
  }

  async patch(url, data) {
    return axios.patch(url, data, this.config).then(r => this.handleResponse(r));
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