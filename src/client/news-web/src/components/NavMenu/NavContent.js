import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { toggleNavMenu } from '../../actions/headerMenu';
import './NavContent.scss';

const NavContent = (props) => {
  const renderItem = (item) => (
    <Link key={item.id} className="nav-content--links-item" to={`/?source=${item.id}`} onClick={onItemClicked}>
      <div className="nav-content--links-item-info">
        <Typography variant="body2">{item.name}</Typography>
        <Typography variant="caption">{item.description}</Typography>
      </div>
    </Link>
  );

  const onItemClicked = () => {
    props.toggleNavMenu(false);
  }

  const sources = props.sources || [1, 2, 3, 4, 5].map(s => {
    return {
      id: s.toString(),
      name: `Test ${s}`,
      description: 'Lorem ipsum dolor',
      url: '/',
    };
  });

  return (
    <div className="nav-content">
      <div className="nav-content--links">
        {
          sources.map(s => renderItem(s))
        }
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  ...state.news,
});

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: (val) => dispatch(toggleNavMenu(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContent);
