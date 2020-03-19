'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

var app = (0, _express2.default)();
app.use(_ErrorHandler2.default);
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

_NewsApiClient2.default.init(process.env.NEWS_API_URL, 10000, { 'X-Api-Key': process.env.NEWS_API_KEY });

app.use('/', _index2.default);
app.use('/api/news', _news2.default);
app.get('*', function (req, res) {
  res.status(404).json({
    message: 'Route does not exist',
    error: 'Request with ' + req.url + ' cannot be handled'
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map