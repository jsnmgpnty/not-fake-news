import React, { useEffect, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import qs from 'qs';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle, Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';

import Article from './Article';
import { getArticles, setCurrentSelectedSource } from '../../actions/news';
import { DEFAULT_PAGE_SIZE } from '../../lib/defaults';
import './HomeView.scss';
import Splash from './Splash';

const HomeView = memo((props) => {
  // De-structured props members
  const {
    articles,
    isArticlesBusy,
    articlesError,
    totalArticles,
    currentArticlePage,
    currentSelectedSource,
    isSessionOnline,
  } = props;
  const location = useLocation();

  // De-structured props functions
  const { getArticles, goToPage, setCurrentSelectedSource } = props;

  // Reference to component element so we can control the scrolling state
  const refHomeView = useRef();

  // On component props changed
  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (!params.page) {
      params.page = 1;
    }

    if (_.isNil(isSessionOnline)) {
      return;
    }

    getArticles(params.query, params.language, params.source, params.pageSize, params.page, isSessionOnline);
    setCurrentSelectedSource(params && params.source ? params.source : null);
    scrollToTop();
  }, [location.search, getArticles, setCurrentSelectedSource, isSessionOnline])

  // Scrolls to top of page
  const scrollToTop = () => {
    const parentElement = _.get(refHomeView, 'current.parentElement', null);
    if (parentElement && parentElement.scrollTo) {
      parentElement.scrollTo(0, 0);
    }
  }

  // Renders article fetching errors
  const renderErrorMessage = (error) => {
    return (
      <Alert severity="warning" className="home-view--alert">
        <AlertTitle>Whoops!</AlertTitle>
        {error}
      </Alert>
    );
  }

  // Handles page selection event
  const onPageChanged = (ev, value) => {
    goToPage(currentSelectedSource, value);
  }

  // Renders article card items
  const renderArticles = (items, total) => {
    if (!items || items.length === 0) {
      return (
        <Alert severity="info" className="home-view--alert">
          <AlertTitle>No articles</AlertTitle>
          Looks like there are no news here. Better check another news source.
        </Alert>
      );
    }

    return items.map(a => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
        <Article item={a} />
      </Grid>
    ));
  }

  // Renders pagination component
  const renderPager = (total) => {
    if (total < 1) {
      return null;
    }

    const pages = Math.floor(total / DEFAULT_PAGE_SIZE) + 1;
    return (
      <Pagination
        className="home-view--articles-pager"
        color="primary"
        page={currentArticlePage}
        count={pages}
        showFirstButton
        showLastButton
        onChange={onPageChanged}
      />
    );
  }

  // Renders spinner/loader
  const renderSkeleton = () => {
    return (
      <Grid container spacing={2} className="home-view--articles">
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
          <Skeleton variant="rect" width="100%" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
          <Skeleton variant="rect" width="100%" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
          <Skeleton variant="rect" width="100%" height={300} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuid()}>
          <Skeleton variant="rect" width="100%" height={300} />
        </Grid>
      </Grid>
    );
  }

  // Renders session offline message
  const renderOfflineMessage = () => {
    return (
      <Alert severity="info" className="home-view--alert">
        <AlertTitle>Offline</AlertTitle>
        You are currently viewing an offline copy of the articles.
      </Alert>
    );
  }

  return (
    <div id="home-view" className="home-view" ref={refHomeView}>
      {
        isArticlesBusy && renderSkeleton()
      }
      {
        !isSessionOnline && renderOfflineMessage()
      }
      {
        !isArticlesBusy && !_.isNil(currentSelectedSource) && (
          <div className="home-view--articles">
            <Grid container spacing={2} className="home-view--articles-list">
              {articlesError && renderErrorMessage(articlesError)}
              {!articlesError && renderArticles(articles)}
            </Grid>
            {!articlesError && renderPager(totalArticles)}
          </div>
        )
      }
      {_.isNil(currentSelectedSource) && <Splash />}
    </div>
  )
});

const mapStateToProps = state => ({
  ...state.news,
  isSessionOnline: _.get(state, 'session.isOnline', true),
});

const mapDispatchToProps = dispatch => ({
  setCurrentSelectedSource: (source) => dispatch(setCurrentSelectedSource(source)),
  getArticles: (query, language, sources, pageSize, page, isOnline) =>
    dispatch(getArticles(query, language, sources, pageSize, page, isOnline)),
  goToPage: (source, page) => dispatch(push(`/?source=${source}&page=${page}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
