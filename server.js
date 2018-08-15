var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.use(express.static(__dirname + '/view/dist/view/'));

app.use(function(req, res) {
     res.sendFile(path.join(__dirname, '/view/dist/view', 'index.html'));
});


var port = process.env.PORT || 5000;

var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
