var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/git_r_dun';

// delete route
router.delete('/:id', function (req, res) {
	tasksID = req.params.id;

	console.log('tasks id to delete: ', tasksID);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		client.query(
			'DELETE FROM tasks WHERE id = $1', [tasksID],
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
	tasksID = req.params.id;
	tasks = req.body;

	console.log('updating tasks ', tasks);

	pg.connect(connectionString, function (err, client, done) {
		if (err) {
			console.log('connection error: ', err);
			res.sendStatus(500);
		}

		// query to update tasks
		client.query(
			'UPDATE tasks SET task=$1, complete=$2' +
			' WHERE id=$3',
			// array of values to use in the query above
      [tasks.task, tasks.complete, tasksID],
			function (err, result) {
				if (err) {
					console.log('update error: ', err);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
	});
}); // end update route

module.exports = router;
