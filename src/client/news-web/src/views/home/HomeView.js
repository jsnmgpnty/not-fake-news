import React, { useEffect, useRef, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import qs from 'qs';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle, Skeleton } from '@material-ui/lab';

import Article from './Article';
import { getArticles } from '../../actions/news';
import './HomeView.scss';

const HomeView = memo((props) => {
  // De-structured props
  const { articles, isArticlesBusy, articlesError, location, getArticles } = props;
  const { search } = location;

  // Reference to component element
  const refHomeView = useRef();

  // On component props changed
  useEffect(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    getArticles(params.query, params.language, params.source, params.pageSize, params.page);
  }, [search, getArticles]);

  useEffect(() => {
    if (refHomeView && refHomeView.current) {
      refHomeView.current.scrollTo(0, 0);
    }
  });

  const renderErrorMessage = (error) => (
    <Alert severity="warning">
      <AlertTitle>Whoops!</AlertTitle>
      {error || 'Something went wrong!'}
    </Alert>
  );

  const renderArticles = (items) => {
    if (!items || items.length === 0) {
      return (
        <Alert severity="info">
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

  const renderSkeleton = () => {
    return (
      <Grid container spacing={2}>
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

  return (
    <div id="home-view" ref={refHomeView}>
      {
        isArticlesBusy && renderSkeleton()
      }
      {
        !isArticlesBusy && (
          <Grid container spacing={2}>
            {articlesError && renderErrorMessage(articlesError)}
            {!articlesError && renderArticles(articles)}
          </Grid>
        )
      }
    </div>
  )
});

const mapStateToProps = state => ({
  ...state.news,
});

const mapDispatchToProps = dispatch => ({
  getArticles: (query, language, sources, pageSize, page) =>
    dispatch(getArticles(query, language, sources, pageSize, page)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeView));
