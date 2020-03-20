import _ from 'lodash';

const extractErrorMessage = (error) => {
  let errorMessage = _.get(error, 'message', null);
  if (_.isObject(errorMessage)) {
    errorMessage = _.get(errorMessage, 'error', null);
    return errorMessage;
  }

  return null;
}

export {
  extractErrorMessage,
};
