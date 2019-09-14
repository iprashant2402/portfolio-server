"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _axios = _interopRequireDefault(require("axios"));

var _xml2js = require("xml2js");

var _expoServerSdk = _interopRequireDefault(require("expo-server-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.get('/', function (req, res) {
  res.redirect('/posts');
});
app.get('/posts', function (req, res) {
  _axios["default"].get('http://medium.com/feed/@iprashant2402').then(function (response) {
    console.log(response.data);
    (0, _xml2js.parseString)(response.data, function (err, res2) {
      console.log(res2.rss.channel);
      res.send(JSON.stringify(res2.rss.channel[0].item));
    });
  })["catch"](function (error) {
    console.log(error);
  });
});
app.get('/newOrderNotification', function (req, res) {
  var expo = new _expoServerSdk["default"]();
  var messages = [];
  messages.push({
    to: 'ExponentPushToken[9z8tQaGU2mkQiLAv5NLS7b]',
    sound: 'default',
    body: 'This is a test notification',
    data: {
      someData: 'data'
    }
  });
  var chunks = expo.chunkPushNotifications(messages);
  var tickets = [];

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, ticketChunk;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = chunks[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 21;
              break;
            }

            chunk = _step.value;
            _context.prev = 7;
            _context.next = 10;
            return expo.sendPushNotificationsAsync(chunk);

          case 10:
            ticketChunk = _context.sent;
            console.log(ticketChunk);
            tickets.push.apply(tickets, _toConsumableArray(ticketChunk)); // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format

            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);
            console.error(_context.t0);

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
  }))();
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});