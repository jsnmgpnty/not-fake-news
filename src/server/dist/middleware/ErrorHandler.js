'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

var _Logger = require('../utils/Logger');

function errorHandler(err, req, res, next) {
  var error = err.error || [{ message: err }];
  _Logger.Logger.error(err);
  res.status(err.status || 500).json(error);
  next();
}
//# sourceMappingURL=ErrorHandler.js.map