import axios from 'axios';
import qs from 'qs';

// timeout in milliseconds
const requestTimeout = 300000;
const defaultErrorMessage = 'Something went wrong..horribly!';
const getErrorMessageFromResponse = (error) => {
  const errorResponse = error.response;

  if (errorResponse) {
    if (errorResponse.data) {
      return errorResponse.data.error_description || errorResponse.data || errorResponse.message || errorResponse;
    }

    return errorResponse.statusText;
  }

  return error.message || defaultErrorMessage;
}

export default class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    axios.defaults.timeout = requestTimeout;
    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (!error) {
        return Promise.reject({
          code: 500,
          message: defaultErrorMessage,
        });
      }

      if (!error.response) {
        if (window && window.location && window.location.href && !window.location.href.includes('/error')) {
          window.location.href = `${window.location.origin}/error`;
        }

        return;
      }

      const errorMessage = getErrorMessageFromResponse(error);
      return Promise.reject({
        code: 500,
        message: errorMessage,
      });
    });
  }

  async makeRequest(method, url, body, contentType, responseType) {
    const headers = {
      'Content-Type': contentType || 'application/json',
    };

    return this.makeRequestWithCustomHeaders(method, url, body, responseType, headers);
  }

  async makeRequestWithCustomHeaders(method, url, data, responseType, headers) {
    const fullUrl = `${this.baseUrl}${url}`;

    const options = {
      method,
      url: fullUrl,
      data,
      headers,
      timeout: requestTimeout,
    };

    if (responseType) {
      options.responseType = responseType;
    }

    const response = await axios(options);

    if (!response || !response.data) {
      return {};
    }

    return response.data;
  }

  async get(url, data = null, contentType, responseType) {
    let params = '';

    if (data) {
      params = `?${qs.stringify(data)}`;
    }

    return this.makeRequest('GET', `${url}${params}`, null, contentType, responseType);
  }

  async post(url, body, contentType, responseType) {
    return this.makeRequest('POST', url, body, contentType, responseType);
  }

  async put(url, body, contentType, responseType) {
    return this.makeRequest('PUT', url, body, contentType, responseType);
  }

  async patch(url, body, contentType, responseType) {
    return this.makeRequest('PATCH', url, body, contentType, responseType);
  }

  async delete(url, body, contentType, responseType) {
    return this.makeRequest('DELETE', url, body, contentType, responseType);
  }
}
