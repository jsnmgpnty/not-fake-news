import * as _ from 'lodash';
import Logger from '../utils/Logger';
import BaseResponse from '../models/BaseResponse';

export default class BaseService {
  getErrorResponse(message, err) {
    Logger.error(err);
    return new BaseResponse(message, err);
  }

  getSuccessResponse(message, data) {
    return new BaseResponse(message, null, data);
  }
}
