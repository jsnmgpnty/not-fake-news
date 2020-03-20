import {
  GET_SOURCES_BUSY,
  GET_SOURCES_ERROR,
  SET_SOURCES,
  GET_ARTICLES_BUSY,
  GET_ARTICLES_ERROR,
  SET_ARTICLES,
  SET_TOTAL_ARTICLES,
  SET_CURRENT_ARTICLE_PAGE,
} from '../actions/news';

const initialState = {
  sources: [],
  sourcesError: null,
  isSourcesBusy: false,
  articles: [],
  articlesError: null,
  isArticlesBusy: false,
  totalArticles: 0,
  currentArticlePage: 1,
};

const news = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case GET_SOURCES_BUSY:
      return { ...state, isSourcesBusy: action.payload };
    case GET_SOURCES_ERROR:
      return { ...state, sourcesError: action.payload };
    case SET_SOURCES:
      return { ...state, sources: action.payload };
    case GET_ARTICLES_BUSY:
      return { ...state, isArticlesBusy: action.payload };
    case GET_ARTICLES_ERROR:
      return { ...state, articlesError: action.payload };
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_TOTAL_ARTICLES:
      return { ...state, totalArticles: action.payload };
    case SET_CURRENT_ARTICLE_PAGE:
      return { ...state, currentArticlePage: action.payload };
    default:
      return state;
  }
};

export default news;
