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

var bodyParser = require("body-parser");

var http = require("https");

var querystring = require('querystring');

require("babel-core/register");

require("babel-polyfill");

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.redirect("/posts");
});
app.get("/posts", function (req, res) {
  _axios["default"].get("http://medium.com/feed/@iprashant2402").then(function (response) {
    console.log(response.data);
    (0, _xml2js.parseString)(response.data, function (err, res2) {
      console.log(res2.rss.channel);
      res.send(JSON.stringify(res2.rss.channel[0].item));
    });
  })["catch"](function (error) {
    console.log(error);
  });
});
app.get("/newOrderNotification", function (req, res) {
  var expo = new _expoServerSdk["default"]();
  var messages = [];
  messages.push({
    to: "ExponentPushToken[BjCZm6MbMFBMQogPfLgjtJ]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: {
      somedata: "new order"
    },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[pkgunlOqbUYS-Krpn3HocP]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: {
      somedata: "new order"
    },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[lor0vxCTqI-SUouDwa-igW]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: {
      somedata: "new order"
    },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[lHaecrNxwnG10I1aJPXJK6]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: {
      somedata: "new order"
    },
    priority: "high"
  });
  var chunks = expo.chunkPushNotifications(messages);
  var tickets = [];

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, ticketChunk, _i, _tickets, ticket;

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
            for (_i = 0, _tickets = tickets; _i < _tickets.length; _i++) {
              ticket = _tickets[_i];
              console.log(ticket);
            }

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
  }))();

  res.send("NEW ORDER");
});
app.post("/selectedUsers", function (req, res) {
  var expo = new _expoServerSdk["default"]();
  var messages = [];
  var postTokens = req.body.tokens;
  var postTitle = req.body.title;
  var postContent = req.body.content;
  postTokens.forEach(function (item) {
    if (_expoServerSdk["default"].isExpoPushToken(item)) {
      messages.push({
        to: item,
        sound: "default",
        title: postTitle,
        body: postContent,
        data: {
          somedata: "new order"
        },
        priority: "high"
      });
    }
  });
  var chunks = expo.chunkPushNotifications(messages);
  var tickets = [];

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, chunk, ticketChunk, _i2, _tickets2, ticket;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 3;
            _iterator2 = chunks[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 21;
              break;
            }

            chunk = _step2.value;
            _context2.prev = 7;
            _context2.next = 10;
            return expo.sendPushNotificationsAsync(chunk);

          case 10:
            ticketChunk = _context2.sent;
            console.log(ticketChunk);
            tickets.push.apply(tickets, _toConsumableArray(ticketChunk)); // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format

            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](7);
            console.error(_context2.t0);

          case 18:
            _iteratorNormalCompletion2 = true;
            _context2.next = 5;
            break;

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](3);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 27:
            _context2.prev = 27;
            _context2.prev = 28;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError2) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError2;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(27);

          case 35:
            for (_i2 = 0, _tickets2 = tickets; _i2 < _tickets2.length; _i2++) {
              ticket = _tickets2[_i2];
              console.log(ticket);
            }

          case 36:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 23, 27, 35], [7, 15], [28,, 30, 34]]);
  }))();

  res.send("YEAH");
});
app.post('/api/sendotp', function (request, response, next) {
  var flag = 0;
  var params = {
    template_id: '5dac02d7d6fc05265e48f5f1',
    mobile: request.body.phone,
    authkey: '299889AtoI1ccEli5dabf539',
    otp_length: 6,
    otp_expiry: 1,
    invisible: 1
  };
  var postdata = querystring.stringify(params); // console.log(postdata);

  var options = {
    'method': 'POST',
    'hostname': 'control.msg91.com',
    'port': null,
    'path': "api/sendotp.php?".concat(postdata),
    "headers": {}
  };
  var url = "https://api.msg91.com/api/v5/otp?".concat(postdata);
  console.log(url);
  var req = http.request(url, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var obj = JSON.parse(body.toString()); // code_id=obj.message;
      //type=obj.type;

      if (obj.type == 'error') {
        flag = 1;
      }

      console.log(obj);
    });
  });
  if (flag == 1) response.status(404).send("{\"message\":\"Some error Occured\"}");else response.send("{\"message\":\"otp sent successfully\"}");
  req.end();
});
app.post('/api/resendotp', function (request, response, next) {
  var params = {
    country: 91,
    retrytype: 'text',
    mobile: request.headers.pno,
    authkey: '299889AtoI1ccEli5dabf539'
  };
  var flag = 0;
  var mobileResponse;
  var query = querystring.stringify(params);
  console.log(query);
  var url = "https://control.msg91.com/api/retryotp.php?".concat(params);
  var req = http.request(url, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      var obj = JSON.parse(body.toString());

      if (obj.type === "error") {
        flag = 1;
      }

      console.log(obj);
      mobileResponse = obj;
    });
  });
  if (flag == 0) response.send(mobileResponse);else response.send({
    message: "Error Occured"
  });
  req.end();
});
app.post('/api/verifyotp', function (request, response, next) {
  var flag = 0;
  var mobileResponse;
  var params = {
    otp: request.body.otp,
    mobile: request.body.phone,
    authkey: '299889AtoI1ccEli5dabf539' // request_id : code_id

  };
  var query = querystring.stringify(params);
  var url = "https://api.msg91.com/api/v5/otp/verify?".concat(query);
  var req = http.request(url, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var obj = JSON.parse(body.toString());
      console.log(obj);

      if (obj.type == "error") {
        flag = 1;
      }
    });
  });
  if (flag == 0) response.send({
    success: true
  });else response.send({
    success: false
  });
  req.end();
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server listening on port 3000");
});