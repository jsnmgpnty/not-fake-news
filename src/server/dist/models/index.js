'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseResponse = require('./BaseResponse');

Object.keys(_BaseResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseResponse[key];
    }
  });
});

var _ErrorInfo = require('./ErrorInfo');

Object.keys(_ErrorInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ErrorInfo[key];
    }
  });
});
//# sourceMappingURL=index.js.map