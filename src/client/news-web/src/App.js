import React, { useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Detector } from "react-detect-offline";

import { AppHeader, NavMenu, NavContent } from './components';
import AppRoutes from './AppRoutes';
import AppTheme from './AppTheme';
import { toggleNavMenu } from './actions/headerMenu';
import { isOnline } from './actions/session';
import { getSources } from './actions/news';

import './App.scss';

const App = memo((props) => {
  const { location, toggleNavMenu } = props;

  useEffect(() => {
    props.getSources();
  }, []);

  useEffect(() => {
    if (toggleNavMenu) {
      toggleNavMenu(false);
    }
    window.scrollTo(0, 0);
  }, [toggleNavMenu, location.pathname]);

  const isOnline = (val) => {
    window.setTimeout(() => {
      props.isOnline(val);
    }, 0);
  };

  return (
    <CssBaseline>
      <MuiThemeProvider theme={AppTheme}>
        <div id="news-main">
          <Hidden smDown implementation="css">
            <NavContent />
          </Hidden>
          <div className="news-content">
            <AppHeader />
            <div className="news-content--body">
              <AppRoutes />
            </div>
          </div>
          <Hidden mdUp implementation="css">
            <NavMenu />
          </Hidden>
        </div>
      </MuiThemeProvider>
      <Detector
        render={({ online }) => {
          isOnline(online);
          return null;
        }}
      />
    </CssBaseline>
  );
});

const mapStateToProps = state => ({
  ...state.navigation,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
  isOnline: (val) => dispatch(isOnline(val)),
  getSources: (category, country, language) => dispatch(getSources(category, country, language)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
