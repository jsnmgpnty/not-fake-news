import React from 'react';
import { Typography } from '@material-ui/core';
import './NotFoundView.scss';

const NotFoundView = () => {
  return (
    <div id="not-found-view">
      <div className="not-found-view--content">
        <Typography variant="h3">404</Typography>
        <Typography variant="h6">This is not the page you are looking for...</Typography>
      </div>
    </div>
  )
}

export default NotFoundView;
