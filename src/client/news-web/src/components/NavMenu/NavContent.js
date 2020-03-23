import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Typography } from '@material-ui/core';

import { toggleNavMenu } from '../../actions/headerMenu';
import './NavContent.scss';

const NavContent = (props) => {
  const { isSessionOnline, sources } = props;

  // Handles item clicked event
  const onItemClicked = () => {
    props.toggleNavMenu(false);
  }

  // Render individual source links
  const renderItem = (item) => (
    <Link key={item.id} className="nav-content--links-item" to={`/?source=${item.id}`} onClick={onItemClicked}>
      <div className="nav-content--links-item-info">
        <Typography variant="body2">{item.name}</Typography>
        <Typography variant="caption">{item.description}</Typography>
      </div>
    </Link>
  );

  // Render offline message display
  const renderOfflineMessage = () => {
    return (
      <Typography variant="body1">You're currently offline!</Typography>
    );
  };

  return (
    <div className="nav-content">
      {
        !isSessionOnline && renderOfflineMessage()
      }
      {
        isSessionOnline && (
          <div className="nav-content--links">
          {
            sources.map(s => renderItem(s))
          }
          </div>
        )
      }
    </div>
  )
};

const mapStateToProps = state => ({
  ...state.news,
  isSessionOnline: _.get(state, 'session.isOnline', true),
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContent);
