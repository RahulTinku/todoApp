var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

router.get('/todos', function(req, res) {
	var db = req.app.get('todo');

	db.todoList.find(function(err, todos) {
		if(err) res.send(err);
		else res.json(todos);
	});
});

router.post('/todo', function(req, res) {
	var db = req.app.get('todo');
	var todoData = req.body;

	db.todoList.save(todoData, function(err, todos) {
		if(err) res.send(err);
		 else res.send(todoData);
	});
});

router.delete('/todo/:id', function(req, res) {
	var db = req.app.get('todo');
	db.todoList.remove({ _id : mongojs.ObjectId(req.params.id)}, function(err, data) {
		if(err) res.send(err);
		else res.send('Succesfully Deleted');
	});
});

router.put('/todo/:id', function(req, res){
	var db = req.app.get('todo');
	var body = req.body;

	db.todoList.update({ _id : mongojs.ObjectId(req.params.id)}, body, function(err, data) {
		if(err) res.send(err);
		else res.send('Successfully Updated');
	});
});

module.exports = router;