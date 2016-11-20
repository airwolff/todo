var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/git_r_dun';

router.get('/', function (req, res) {

	console.log('get request');

	// get tasks from DB
	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query('SELECT * FROM task', function (err, result) {
			done(); // closes the connection.

			if (err) {
				console.log('select query error: ', err);
				res.sendStatus(500);
			}
			res.send(result.rows);
		});
	});
}); // ends get route

// create tasks route
router.post('/', function (req, res) {
	var newTask = req.body;

	console.log('new tasks insert body ' + newTask);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		// create new tasks
		client.query(
			'INSERT INTO tasks (task, complete) ' +
			'VALUES ($1, $2)', [newTask.task, newTask.complete],
			function (err, result) {
				done();

				if (err) {
					console.log('insert query error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
	});
}); // end post create tasks route

module.exports = router;
