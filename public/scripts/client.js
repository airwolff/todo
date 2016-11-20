$(document).ready(function () {
	getTasks();

	// add tasks
	$('#submitTasks').on('click', submitToDo);
	// delete tasks
	$("#tasksList").on('click', '.delete', deleteTasks);
	// update tasks
	$("#tasksList").on('click', '.update', updateTasks);
});

// Get tasks and append
function getTasks() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (task) {
			appendTasks(task);
		},
		error: function () {
			console.log('Database error');
		}

	});
}

// add tasks to DB
function submitToDo() {
	event.preventDefault();

	var newToDo = {};

	$.each($('#addTaskForm').serializeArray(), function (i, field) {
		newToDo[field.name] = field.value;
	});

	console.log('newToDo: ', newToDo);

	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: newToDo,
		success: function (response) {
			getTasks();
		},
		error: function () {
			console.log('tasks not posted');
		}
	});
} // end add function


// delete tasks
function deleteTasks() {
	var id = $(this).parent().data('id');
	console.log(id);

	$.ajax({
		type: 'DELETE',
		url: '/tasks/' + id,
		success: function (result) {
			getTasks();
		},
		error: function (result) {
			console.log('tasks not deleted.');
		}
	});
} // end delete function

function updateTasks() {
	var id = $(this).parent().data('id');
	console.log(id);

	var tasks = {};

	var fields = $(this).parent().children().serializeArray();

	fields.forEach(function (field) {
		tasks[field.name] = field.value;
	});

	console.log(tasks);

	$.ajax({
		type: 'PUT',
		url: '/change/' + id,
		data: tasks,
		success: function (result) {
			console.log('yo, you got updated');
			getTasks();
		},

		error: function (result) {
			console.log('tasks not updated!');
		}
	});
} // end update function

function appendTasks(tasks) {
	$("#addToDo").empty();

	for (var i = 0; i < tasks.length; i++) {
		$("#tasksList").append('<div class="tasks row"></div>');

		$el = $('#toDoList').children().last();

		var notDone = tasks[i];

		$el.data('id', notDone.id);

		console.log("task from DB: ", notDone.task);

		$el.append('<input type="text" name="tasks" value="' + notDone.task + '" />');

		$el.append('<input type="checkbox" id="completeCheckBox" value="' + notDone.complete + '" />');

		$el.append('<button class="update">Update</button>');

		$el.append('<button class="delete">Delete</button>');
	}
}
