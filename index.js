var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
// app.use("/styles", express.static(__dirname));
app.use("/sounds", express.static(__dirname + '/01 - JavaScript Drum Kit/sounds'));
// app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
app.get('/drumkit', function (req, res) {
  res.sendFile(path.join(__dirname + '/01 - JavaScript Drum Kit/index.html'));
});
app.get('/paint', function (req, res) {
  res.sendFile(path.join(__dirname + '/08 - Fun with HTML5 Canvas/index.html'));
});
app.get('/css-transitions', function (req, res) {
  res.sendFile(path.join(__dirname + '/16 - Mouse Move Shadow/index.html'));
});
app.get('/flexbox', function (req, res) {
  res.sendFile(path.join(__dirname + '/05 - Flex Panel Gallery/index-START.html'));
});

app.listen(process.env.PORT || 8080);
