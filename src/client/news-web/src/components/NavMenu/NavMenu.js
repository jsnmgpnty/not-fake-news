import React from 'react';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { toggleNavMenu } from '../../actions/headerMenu';
import NavContent from './NavContent';
import './NavMenu.scss';

const mapStateToProps = state => ({
  ...state.headerMenu,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

const NavMenu = (props) => {
  const onStateChange = (newState) => (event) => {
    const { toggleNavMenu } = props;
    toggleNavMenu(newState);
  }

  const { isNavMenuOpen } = props;

  return (
    <SwipeableDrawer
      id="nav-menu"
      anchor="left"
      className="nav-menu"
      open={isNavMenuOpen}
      onOpen={onStateChange(true)}
      onClose={onStateChange(false)}
      classes={{
        paper: 'nav-menu paper',
      }}
    >
      <NavContent />
    </SwipeableDrawer>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
