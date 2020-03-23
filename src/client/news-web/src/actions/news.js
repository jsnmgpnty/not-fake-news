import { reactLocalStorage } from 'reactjs-localstorage';
import NewsApi from '../services/NewsApi';
import { getErrorMessage } from '../lib/errorHandling';

// Fetch news sources actions 
export const GET_SOURCES_BUSY = 'GET_SOURCES_BUSY';
export const GET_SOURCES_ERROR = 'GET_SOURCES_ERROR';
export const SET_SOURCES = 'SET_SOURCES';

// Fetch news articles actions 
export const GET_ARTICLES_BUSY = 'GET_ARTICLES_BUSY';
export const GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR';
export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_TOTAL_ARTICLES = 'SET_TOTAL_ARTICLES';
export const SET_CURRENT_ARTICLE_PAGE = 'SET_CURRENT_ARTICLE_PAGE';
export const SET_CURRENT_SELECTED_SOURCE = 'SET_CURRENT_SELECTED_SOURCE';
export const SET_CACHED_ARTICLES = 'SET_CACHED_ARTICLES';

const setNewsArticleError = (dispatch, error) => {
  dispatch({ type: SET_TOTAL_ARTICLES, payload: 0 });
  dispatch({ type: SET_CURRENT_ARTICLE_PAGE, payload: 1 });
  dispatch({ type: GET_ARTICLES_ERROR, payload: error });
  dispatch({ type: GET_ARTICLES_BUSY, payload: false });
}

const getSources = (category, country, language) => {
  return async (dispatch) => {
    dispatch({ type: GET_SOURCES_BUSY, payload: true });

    try {
      const result = await NewsApi.getSources(category, country, language);

      if (result && result.data) {
        dispatch({ type: SET_SOURCES, payload: result.data });
        dispatch({ type: GET_SOURCES_ERROR, payload: null });
      } else {
        dispatch({ type: GET_SOURCES_ERROR, payload: getErrorMessage(result.error) });
      }

      dispatch({ type: GET_SOURCES_BUSY, payload: false });
    } catch (error) {
      dispatch({ type: GET_SOURCES_BUSY, payload: false });
      dispatch({ type: GET_SOURCES_ERROR, payload: getErrorMessage(error.error) });
    }
  };
}

const getArticles = (query, language, sources, pageSize, page, isOnline) => {
  return async (dispatch) => {
    dispatch({ type: GET_ARTICLES_BUSY, payload: true });
    dispatch({ type: SET_CURRENT_ARTICLE_PAGE, payload: page });
    dispatch({ type: SET_CURRENT_SELECTED_SOURCE, payload: sources });

    if (!isOnline) {
      const cachedArticles = reactLocalStorage.get(`articles-${page}`);
      if (!cachedArticles) {
        dispatch({ type: GET_ARTICLES_BUSY, payload: false });
        return;
      }

      const articleList = JSON.parse(cachedArticles);
      const cachedTotalNum = reactLocalStorage.get('articles-total');

      if (articleList && articleList.length) {
        dispatch({ type: SET_ARTICLES, payload: articleList });
        dispatch({ type: SET_TOTAL_ARTICLES, payload: parseInt(cachedTotalNum, 10) });
      }

      dispatch({ type: GET_ARTICLES_BUSY, payload: false });
      return;
    }

    try {
      const result = await NewsApi.getArticles(query, language, sources, pageSize, page);

      if (result && result.data && result.data.articles) {
        dispatch({ type: SET_ARTICLES, payload: result.data.articles });
        dispatch({ type: SET_TOTAL_ARTICLES, payload: result.data.totalResults });
        dispatch({ type: GET_ARTICLES_ERROR, payload: null });
        dispatch({ type: GET_ARTICLES_BUSY, payload: false });
        reactLocalStorage.set('articles-total', result.data.totalResults);
        reactLocalStorage.set(`articles-${page}`, JSON.stringify(result.data.articles));
      } else {
        setNewsArticleError(dispatch, getErrorMessage(result.error));
      }
    } catch (error) {
      setNewsArticleError(dispatch, getErrorMessage(error.error));
    }
  };
}

const setCurrentArticlePage = (payload) => ({ type: SET_CURRENT_ARTICLE_PAGE, payload });

const setCurrentSelectedSource = (payload) => ({ type: SET_CURRENT_SELECTED_SOURCE, payload });

export {
  getSources,
  getArticles,
  setCurrentArticlePage,
  setCurrentSelectedSource,
}