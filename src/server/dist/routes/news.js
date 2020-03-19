'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _NewsService = require('../services/NewsService');

var _NewsService2 = _interopRequireDefault(_NewsService);

var _Logger = require('../utils/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

// Get all news listing
router.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var query, language, sources, pageSize, page, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.query.query;
            language = req.query.language;
            sources = req.query.sources;
            pageSize = req.query.pageSize;
            page = req.query.page;
            _context.prev = 5;
            _context.next = 8;
            return _NewsService2.default.getEverything(query, language, sources, pageSize, page);

          case 8:
            result = _context.sent;

            res.json(result);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](5);

            _Logger2.default.error(_context.t0);
            next();

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// Get top news headlines
router.get('/top', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var query, country, category, sources, pageSize, page, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = req.query.query;
            country = req.query.country;
            category = req.query.category;
            sources = req.query.sources;
            pageSize = req.query.pageSize;
            page = req.query.page;
            _context2.prev = 6;
            _context2.next = 9;
            return _NewsService2.default.getTopHeadlines(query, country, category, sources, pageSize, page);

          case 9:
            result = _context2.sent;

            res.json(result);
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](6);

            _Logger2.default.error(_context2.t0);
            next();

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 13]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

// Get news sources
router.get('/sources', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var country, category, language, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            country = req.query.country;
            category = req.query.category;
            language = req.query.language;
            _context3.prev = 3;
            _context3.next = 6;
            return _NewsService2.default.getSources(category, country, language);

          case 6:
            result = _context3.sent;

            res.json(result);
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](3);

            _Logger2.default.error(_context3.t0);
            next();

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 10]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=news.js.map