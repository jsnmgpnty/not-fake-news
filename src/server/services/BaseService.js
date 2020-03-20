import * as _ from 'lodash';
import Logger from '../utils/Logger';
import BaseResponse from '../models/BaseResponse';

export default class BaseService {
  getErrorResponse(err) {
    Logger.error(err);
    return new BaseResponse(err);
  }

  getSuccessResponse(data) {
    return new BaseResponse(null, data);
  }
}
