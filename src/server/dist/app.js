'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _ErrorHandler = require('./middleware/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

require('regenerator-runtime/runtime.js');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _news = require('./routes/news');

var _news2 = _interopRequireDefault(_news);

var _NewsApiClient = require('./utils/NewsApiClient');

var _NewsApiClient2 = _interopRequireDefault(_NewsApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// Cors config
// ===============================
var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);

    if (whitelist.indexOf(_origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }

  // Server setup
  // ===============================
};var app = (0, _express2.default)();
app.use(_ErrorHandler2.default);
app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)(corsOptions));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

_NewsApiClient2.default.init(process.env.NEWS_API_URL, 60000, { 'X-Api-Key': process.env.NEWS_API_KEY });

// Routing setup
// ===============================
app.use('/', _index2.default);
app.use('/api/news', _news2.default);
app.get('*', function (req, res) {
  res.status(404).json({
    error: 'notFound'
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map