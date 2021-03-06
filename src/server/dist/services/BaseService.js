'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _Logger = require('../utils/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _BaseResponse = require('../models/BaseResponse');

var _BaseResponse2 = _interopRequireDefault(_BaseResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseService = function () {
  function BaseService() {
    _classCallCheck(this, BaseService);
  }

  _createClass(BaseService, [{
    key: 'getErrorResponse',
    value: function getErrorResponse(err) {
      _Logger2.default.error(err);
      return new _BaseResponse2.default(err);
    }
  }, {
    key: 'getSuccessResponse',
    value: function getSuccessResponse(data) {
      return new _BaseResponse2.default(null, data);
    }
  }]);

  return BaseService;
}();

exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map