'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseResponse = function BaseResponse(error, data) {
  _classCallCheck(this, BaseResponse);

  if (!_.isNil(error)) {
    this.error = error;
    this.data = null;
  } else {
    this.error = null;
    this.data = data;
  }
};

exports.default = BaseResponse;
//# sourceMappingURL=BaseResponse.js.map