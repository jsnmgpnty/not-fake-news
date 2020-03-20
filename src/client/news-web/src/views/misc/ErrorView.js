import React from 'react';
import { Typography } from '@material-ui/core';
import errorSplash from '../../assets/error-splash.png';
import './ErrorView.scss';

const ErrorView = () => {
  return (
    <div id="error-view">
      <div className="error-view--content">
        <img src={errorSplash} alt="Something went wrong!" />
        <Typography variant="h4">Omg! Something went horribly wrong!</Typography>
      </div>
    </div>
  )
}

export default ErrorView;
