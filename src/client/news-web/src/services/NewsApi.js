import ApiClient from './ApiClient';
import * as _ from 'lodash';

const baseApiUrl = _.get(window, 'appConfig.apiUrl', 'http://localhost:3100/');

class NewsApi extends ApiClient {
  constructor() {
    super(baseApiUrl);
  }

  async getArticles(query, language, sources, pageSize, page) {
    let url = '/news?';

    if (!_.isNil(query)) {
      url = `${url}q=${query}&`;
    }

    if (!_.isNil(sources)) {
      url = `${url}sources=${sources}&`;
    }

    url = `${url}pageSize=${(!_.isNil(pageSize) ? pageSize : 12)}&`;
    url = `${url}page=${(!_.isNil(page) ? page : 1)}&`;
    url = `${url}language=${(!_.isNil(language) ? language : 'en')}&`;
    url = url.slice(0, -1);

    return this.get(url);
  }

  async getTopHeadlines(query, country, category, sources, pageSize, page) {
    let url = '/news/top-headlines?';

    if (!_.isNil(query)) {
      url = `${url}q=${query}&`;
    }

    if (!_.isNil(sources)) {
      url = `${url}sources=${sources}&`;
    } else {
      if (!_.isNil(country)) {
        url = `${url}country=${country}&`;
      }
  
      if (!_.isNil(category)) {
        url = `${url}category=${category}&`;
      }
    }

    url = `${url}pageSize=${(!_.isNil(pageSize) ? pageSize : 12)}&`;
    url = `${url}page=${(!_.isNil(page) ? page : 1)}&`;
    url = url.slice(0, -1);

    return this.get(url);
  }

  async getSources(category, country, language) {
    let url = '/news/sources?';

    if (!_.isNil(country)) {
      url = `${url}country=${country}&`;
    }

    if (!_.isNil(category)) {
      url = `${url}category=${category}&`;
    }

    if (!_.isNil(language)) {
      url = `${url}language=${language}&`;
    }

    return this.get(url);
  }
}

export default new NewsApi();
