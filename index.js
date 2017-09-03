var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
// app.use("/styles", express.static(__dirname));
// app.use("/sounds", express.static(__dirname + '/sounds'));
// app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

// add other routes below
app.get('/drumkit', function (req, res) {
  res.sendFile(path.join(__dirname + '/01 - JavaScript Drum Kit/index.html'));
});

app.listen(process.env.PORT || 8080);
