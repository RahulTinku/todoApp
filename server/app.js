var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index'); 
var todo = require('./routes/todo');

var mongojs = require('mongojs');

var port = 8080;

var app = express();

var db = mongojs('mongodb://rahul:rahul@ds047325.mlab.com:47325/todo', ['todoList']);

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '../client/src'));

app.set('todo', db);

app.use('/', index);
app.use('/api', todo);

app.get('*', function(req, res) {
	res.render(path.join(__dirname, '../client/src/index.html'));
});

app.listen(port, function() {
	console.log('server started on port : ', port);
});