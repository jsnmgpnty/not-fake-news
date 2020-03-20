import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-advanced';
import { BounceLoader } from 'react-spinners';
import './Spinner.scss';

const propTypes = {
  isLoading: PropTypes.bool,
  hideContent: PropTypes.bool,
  children: PropTypes.any,
  blur: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  spinnerType: PropTypes.oneOf(['bounce'])
};

const defaultProps = {
  isLoading: false,
  hideContent: false,
  children: null,
  blur: 10,
  color: '#00aeef',
  className: '',
  spinnerType: 'bounce'
};

const showContent = (props) => {
  if (props.hideContent && props.isLoading) {
    return null;
  }

  return props.children;
}

const getMessage = (props) => {
  return  <BounceLoader loading={props.isLoading} color={props.color} />;
}

function Spinner(props) {
  return (
    <div className={`spinner-block ${props.className}`}>
      <Loader
        show={props.isLoading}
        message={getMessage(props)}
        hideContentOnLoad={props.hideContent}
        contentBlur={props.blur}
        backgroundStyle={{backgroundColor: 'none'}}
      >
        {
          showContent(props)
        }
      </Loader>
    </div>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
