import React from 'react';

import './FlameSpinner.scss';

const FlameSpinner = () => {
  return (
    <div className="flame-spinner-container">
      <div className="flame-spinner">
        <div className="flames">
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
        </div>
        <div className="logs"></div>
      </div>
    </div>
  )
}

export default FlameSpinner;
