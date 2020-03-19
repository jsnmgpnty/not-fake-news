import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { Typography } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';

import { toggleNavMenu } from '../../actions/headerMenu';
import headerIcon from '../../assets/header-icon.png';
import './AppHeader.scss';

const mapStateToProps = state => ({
  ...state.headerMenu,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

const AppHeader = (props) => {
  const toggleNavigationMenu = () => {
    const { isNavMenuOpen, toggleNavMenu } = props;
    toggleNavMenu(!isNavMenuOpen);
  }

  const renderMenuToggle = () => {
    const { isNavMenuOpen } = props;

    return (
      <IconButton
        className={`app-header--menu-toggle ${isNavMenuOpen ? 'open' : ''}`}
        onClick={toggleNavigationMenu}
        color="inherit"
        aria-label="Menu"
      >
        <FiMenu />
      </IconButton>
    );
  }

  return (
    <AppBar id="app-header" className="app-header" position="relative">
      <Toolbar>
        <Hidden mdUp implementation="css">
          {renderMenuToggle()}
        </Hidden>
        <Typography className="app-header--brand" variant="h6">
          <img src={headerIcon} />
          Not a Fake News Site
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
export { AppHeader as PlainAppHeader };

