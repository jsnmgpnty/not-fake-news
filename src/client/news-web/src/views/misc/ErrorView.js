import React from 'react';
import errorSplash from '../../assets/error-splash.png';
import './ErrorView.scss';

const ErrorView = () => {
  return (
    <div id="error-view">
      <div className="error-view--content">
        <img src={errorSplash} alt="Something went wrong!" />
        <h2>Omg! Something went horribly wrong!</h2>
      </div>
    </div>
  )
}

export default ErrorView;
