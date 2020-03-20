import NewsApi from '../services/NewsApi';
import { extractErrorMessage } from '../lib/errorHandling';

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

const getSources = (category, country, language) => {
  return async (dispatch) => {
    dispatch({ type: GET_SOURCES_BUSY, payload: true });

    try {
      const result = await NewsApi.getSources(category, country, language);

      if (result && result.data) {
        dispatch({ type: SET_SOURCES, payload: result.data });
        dispatch({ type: GET_SOURCES_ERROR, payload: null });
      } else {
        dispatch({ type: GET_SOURCES_ERROR, payload: result.error || 'Failed to load sources.' });
      }

      dispatch({ type: GET_SOURCES_BUSY, payload: false });
    } catch (error) {
      const errorMessage = extractErrorMessage(error) || 'Failed to load sources';
      dispatch({ type: GET_SOURCES_BUSY, payload: false });
      dispatch({ type: GET_SOURCES_ERROR, payload: errorMessage });
    }
  };
}

const getArticles = (query, language, sources, pageSize, page) => {
  return async (dispatch) => {
    dispatch({ type: GET_ARTICLES_BUSY, payload: true });

    try {
      const result = await NewsApi.getArticles(query, language, sources, pageSize, page);

      if (result && result.data && result.data.articles) {
        dispatch({ type: SET_ARTICLES, payload: result.data.articles });
        dispatch({ type: SET_TOTAL_ARTICLES, payload: result.data.totalResults });
        dispatch({ type: GET_ARTICLES_ERROR, payload: null });
      } else {
        dispatch({ type: GET_ARTICLES_ERROR, payload: result.error || 'Failed to load articles.' });
        dispatch({ type: SET_TOTAL_ARTICLES, payload: 0 });
      }

      dispatch({ type: GET_ARTICLES_BUSY, payload: false });
    } catch (error) {
      const errorMessage = extractErrorMessage(error) || 'Failed to load articles';
      dispatch({ type: GET_ARTICLES_BUSY, payload: false });
      dispatch({ type: GET_ARTICLES_ERROR, payload: errorMessage });
      dispatch({ type: SET_TOTAL_ARTICLES, payload: 0 });
    }
  };
}

const setCurrentArticlePage = (payload) => ({ type: SET_CURRENT_ARTICLE_PAGE, payload });

export {
  getSources,
  getArticles,
  setCurrentArticlePage,
}