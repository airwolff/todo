var router = require('express').Router();
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

		client.query('SELECT * FROM tasks',
			function (err, result) {
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

		// create new tasks, requires only task, default of complete is false
		client.query(
			'INSERT INTO tasks (task) VALUES ($1) RETURNING *;', [newTask.task],
			function (err, result) {
				done();

				if (err) {
					console.log('insert query error: ', err);
					res.sendStatus(500);
				} else {
					res.send(result.rows);
				}
			});
	});
}); // end post create tasks route

// delete route
router.delete('/:id', function (req, res) {
	var taskID = req.params.id;

	console.log('tasks id to delete: ', taskID);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM tasks WHERE id = $1', [taskID],
			function (err, result) {
				done();

				if (err) {
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	});
});

// update tasks route
router.put('/:id', function (req, res) {
	var taskID = req.params.id;
	var changeTask = req.body.task;
	var complete = req.body.complete;

	console.log('updating changeTask ', changeTask);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		// query to update tasks
		client.query(
			'UPDATE tasks SET task=$1, complete=$2 WHERE id=$3 RETURNING *',
			// array of values to use in the query above
      [changeTask, complete, taskID],
			function (err, result) {
				done()
				if (err) {
					console.log('update error: ', err);
					res.sendStatus(500);
				} else {
					console.log("result.rows", result.rows);
					res.send(result.rows);
				}
			});
	});
}); // end update route

module.exports = router;
