import * as _ from 'lodash';

export default class BaseResponse {
  constructor (error, data) {
    if (!_.isNil(error)) {
      this.error = error;
      this.data = null;
    } else {
      this.error = null;
      this.data = data;
    }
  }
}
