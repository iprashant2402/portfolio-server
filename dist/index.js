"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _axios = _interopRequireDefault(require("axios"));

var _xml2js = require("xml2js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
app.listen(process.env.PORT || 3000);