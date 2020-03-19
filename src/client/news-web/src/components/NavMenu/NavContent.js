import React from 'react';
import { Link } from 'react-router-dom';

import './NavContent.scss';
import { Typography } from '@material-ui/core';

const NavContent = (props) => {
  const renderItem = (item) => (
    <Link key={item.id} className="nav-content--links-item" to={item.url}>
      <div className="nav-content--links-item-info">
        <Typography variant="body2">{item.name}</Typography>
        <Typography variant="caption">{item.description}</Typography>
      </div>
    </Link>
  );

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

export default NavContent;
