import React, { useEffect, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AppHeader, NavMenu, NavContent } from './components';
import AppRoutes from './AppRoutes';
import AppTheme from './AppTheme';
import { toggleNavMenu } from './actions/headerMenu';

import './App.scss';

const App = memo((props) => {
  const { location, toggleNavMenu } = props;

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (toggleNavMenu) {
      toggleNavMenu(false);
    }
    window.scrollTo(0, 0);
  }, [toggleNavMenu, location.pathname]);

  return (
    <CssBaseline>
      <MuiThemeProvider theme={AppTheme}>
        <div id="news-main">
          <Hidden smDown implementation="css">
            <NavContent />
          </Hidden>
          <div className="news-content">
            <AppHeader />
            <AppRoutes />
          </div>
          <Hidden mdUp implementation="css">
            <NavMenu />
          </Hidden>
        </div>
      </MuiThemeProvider>
    </CssBaseline>
  );
});

const mapStateToProps = state => ({
  ...state.navigation,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
