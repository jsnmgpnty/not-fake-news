import * as _ from 'lodash';
import BaseService from './BaseService';
import NewsApiClient from '../utils/NewsApiClient';
import Logger from '../utils/Logger';

const handleErrorMessage = (err) => {
  Logger.error(err);
  const code = _.get(err, 'response.data.code', 'unexpectedError');
  return code;
}

// Handles fetching of news articles
const getNewsArticles = async (url, genericErrorMessage, onSuccess, onError) => {
  if (!url || !onSuccess || !onError) {
    const message = 'Invalid arguments passed!';
    Logger.error(message);
    return { error: 'parameterInvalid' }
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
    const errorMessage = handleErrorMessage(error);
    return onError(errorMessage);
  }
}

class NewsService extends BaseService {
  // Get all articles from news sources selected
  async getEverything(query, language, sources, pageSize, page) {
    if (_.isNil(query) && _.isNil(sources)) {
      const err = 'parametersTooBroad';
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

    return await getNewsArticles(url, 'unexpectedError', this.getSuccessResponse, this.getErrorResponse);
  }

  // Get only top headlines from news sources selected
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

    return await getNewsArticles(url, 'unexpectedError', this.getSuccessResponse, this.getErrorResponse);
  }

  // Get news sources (abc-news, buzzfeed, etc.)
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
        Logger.error(`Response from ${url} is invalid`, result);
        return this.getErrorResponse('unexpectedError');
      }

      delete result.status;
      return this.getSuccessResponse(result.sources);
    } catch (error) {
      Logger.error(`Response from ${url} is invalid`, error);
      const errorMessage = handleErrorMessage(error);
      return this.getErrorResponse(errorMessage);
    }
  }
}

const NewsServiceInstance = new NewsService();

export { NewsServiceInstance as NewsService };
export default NewsServiceInstance;
