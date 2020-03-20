'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _BaseService2 = require('./BaseService');

var _BaseService3 = _interopRequireDefault(_BaseService2);

var _NewsApiClient = require('../utils/NewsApiClient');

var _NewsApiClient2 = _interopRequireDefault(_NewsApiClient);

var _Logger = require('../utils/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var handleErrorMessage = function handleErrorMessage(err) {
  _Logger2.default.error(err);
  var code = _.get(err, 'response.data.code', 'unexpectedError');
  return code;
};

// Handles fetching of news articles
var getNewsArticles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, genericErrorMessage, onSuccess, onError) {
    var message, result, errorMessage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!url || !onSuccess || !onError)) {
              _context.next = 4;
              break;
            }

            message = 'Invalid arguments passed!';

            _Logger2.default.error(message);
            return _context.abrupt('return', { error: 'parameterInvalid' });

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _NewsApiClient2.default.getInstance().get(url);

          case 7:
            result = _context.sent;

            if (!(!result || !result.articles || result.status && result.status.toLowerCase() !== 'ok')) {
              _context.next = 11;
              break;
            }

            _Logger2.default.error('Response from ' + url + ' is invalid');
            return _context.abrupt('return', undefined.getErrorResponse(genericErrorMessage));

          case 11:

            // Set to actual null value instead of null for url images 
            result.articles.forEach(function (a) {
              if (a.urlToImage === 'null') {
                a.urlToImage = null;
              }
            });

            if (result.hasOwnProperty('status')) {
              delete result.status;
            }
            return _context.abrupt('return', onSuccess(result));

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](4);
            errorMessage = handleErrorMessage(_context.t0);
            return _context.abrupt('return', onError(errorMessage));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 16]]);
  }));

  return function getNewsArticles(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var NewsService = function (_BaseService) {
  _inherits(NewsService, _BaseService);

  function NewsService() {
    _classCallCheck(this, NewsService);

    return _possibleConstructorReturn(this, (NewsService.__proto__ || Object.getPrototypeOf(NewsService)).apply(this, arguments));
  }

  _createClass(NewsService, [{
    key: 'getEverything',

    // Get all articles from news sources selected
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query, language, sources, pageSize, page) {
        var err, url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_.isNil(query) && _.isNil(sources))) {
                  _context2.next = 3;
                  break;
                }

                err = 'parametersTooBroad';
                return _context2.abrupt('return', this.getErrorResponse(err, err));

              case 3:
                url = '/everything?';


                if (!_.isNil(query)) {
                  url = url + 'q=' + query + '&';
                }

                if (!_.isNil(sources)) {
                  url = url + 'sources=' + sources + '&';
                }

                url = url + 'pageSize=' + (!_.isNil(pageSize) ? pageSize : 12) + '&';
                url = url + 'page=' + (!_.isNil(page) ? page : 1) + '&';
                url = url + 'language=' + (!_.isNil(language) ? language : 'en') + '&';
                url = url.slice(0, -1);

                _context2.next = 12;
                return getNewsArticles(url, 'unexpectedError', this.getSuccessResponse, this.getErrorResponse);

              case 12:
                return _context2.abrupt('return', _context2.sent);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getEverything(_x5, _x6, _x7, _x8, _x9) {
        return _ref2.apply(this, arguments);
      }

      return getEverything;
    }()

    // Get only top headlines from news sources selected

  }, {
    key: 'getTopHeadlines',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query, country, category, sources, pageSize, page) {
        var url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = '/top-headlines?';


                if (!_.isNil(query)) {
                  url = url + 'q=' + query + '&';
                }

                if (!_.isNil(sources)) {
                  url = url + 'sources=' + sources + '&';
                } else {
                  if (!_.isNil(country)) {
                    url = url + 'country=' + country + '&';
                  }

                  if (!_.isNil(category)) {
                    url = url + 'category=' + category + '&';
                  }
                }

                url = url + 'pageSize=' + (!_.isNil(pageSize) ? pageSize : 12) + '&';
                url = url + 'page=' + (!_.isNil(page) ? page : 1) + '&';
                url = url.slice(0, -1);

                _context3.next = 8;
                return getNewsArticles(url, 'unexpectedError', this.getSuccessResponse, this.getErrorResponse);

              case 8:
                return _context3.abrupt('return', _context3.sent);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getTopHeadlines(_x10, _x11, _x12, _x13, _x14, _x15) {
        return _ref3.apply(this, arguments);
      }

      return getTopHeadlines;
    }()

    // Get news sources (abc-news, buzzfeed, etc.)

  }, {
    key: 'getSources',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(category, country, language) {
        var url, result, errorMessage;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = '/sources?';


                if (!_.isNil(country)) {
                  url = url + 'country=' + country + '&';
                }

                if (!_.isNil(category)) {
                  url = url + 'category=' + category + '&';
                }

                if (!_.isNil(language)) {
                  url = url + 'language=' + language + '&';
                }

                _context4.prev = 4;
                _context4.next = 7;
                return _NewsApiClient2.default.getInstance().get(url);

              case 7:
                result = _context4.sent;

                if (!(!result || !result.sources || result.status.toLowerCase() !== 'ok')) {
                  _context4.next = 11;
                  break;
                }

                _Logger2.default.error('Response from ' + url + ' is invalid', result);
                return _context4.abrupt('return', this.getErrorResponse('unexpectedError'));

              case 11:

                delete result.status;
                return _context4.abrupt('return', this.getSuccessResponse(result.sources));

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](4);

                _Logger2.default.error('Response from ' + url + ' is invalid', _context4.t0);
                errorMessage = handleErrorMessage(_context4.t0);
                return _context4.abrupt('return', this.getErrorResponse(errorMessage));

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 15]]);
      }));

      function getSources(_x16, _x17, _x18) {
        return _ref4.apply(this, arguments);
      }

      return getSources;
    }()
  }]);

  return NewsService;
}(_BaseService3.default);

var NewsServiceInstance = new NewsService();

exports.NewsService = NewsServiceInstance;
exports.default = NewsServiceInstance;
//# sourceMappingURL=NewsService.js.map