import * as _ from 'lodash';
import BaseService from './BaseService';
import NewsApiClient from '../utils/NewsApiClient';
import Logger from '../utils/Logger';

const getNewsResponse = async (url, genericErrorMessage, onSuccess, onError) => {
  if (!url || !onSuccess || !onError) {
    const message = 'Invalid arguments passed!';
    Logger.error(message);
    return { message }
  }

  try {
    const result = await NewsApiClient.getInstance().get(url);
    if (!result || !result.articles || (result.status && result.status.toLowerCase() !== 'ok')) {
      Logger.error(`Response from ${url} is invalid`);
      return this.getErrorResponse(genericErrorMessage);
    }

    // Set to actual null value instead of null for url images 
    result.articles.forEach(a => {
      if (a.urlToImage === 'null') {
        a.urlToImage = null;
      }
    });

    if (result.hasOwnProperty('status')) {
      delete result.status;
    }
    return onSuccess(result);
  } catch (error) {
    Logger.error(`Response from ${url} is invalid\r\n`, error);
    return onError(error || genericErrorMessage);
  }
}

class NewsService extends BaseService {
  async getEverything(query, language, sources, pageSize, page) {
    if (_.isNil(query) && _.isNil(sources)) {
      const err = 'Please select a source or add a search term or we\'ll be sending a sh*t ton of articles';
      return this.getErrorResponse(err, err);
    }
    
    let url = '/everything?';

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

    return await getNewsResponse(url, 'Failed to get articles', this.getSuccessResponse, this.getErrorResponse);
  }

  async getTopHeadlines(query, country, category, sources, pageSize, page) {
    let url = '/top-headlines?';

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

    return await getNewsResponse(url, 'Failed to get articles', this.getSuccessResponse, this.getErrorResponse);
  }

  async getSources(category, country, language) {
    let url = '/sources?';

    if (!_.isNil(country)) {
      url = `${url}country=${country}&`;
    }

    if (!_.isNil(category)) {
      url = `${url}category=${category}&`;
    }

    if (!_.isNil(language)) {
      url = `${url}language=${language}&`;
    }

    try {
      const result = await NewsApiClient.getInstance().get(url);
      if (!result || !result.sources || result.status.toLowerCase() !== 'ok') {
        Logger.error(`Response from ${url} is invalid`);
        return this.getErrorResponse(genericErrorMessage);
      }

      delete result.status;
      return this.getSuccessResponse(result.sources);
    } catch (error) {
      Logger.error(`Response from ${url} is invalid`, error);
      return this.getErrorResponse(error || genericErrorMessage);
    }
  }
}

const NewsServiceInstance = new NewsService();

export { NewsServiceInstance as NewsService };
export default NewsServiceInstance;
