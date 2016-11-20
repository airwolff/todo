$(document).ready(function () {
	getToDo();

	// add tasks
	$('#submitTasks').on('click', submitToDo);
	// delete tasks
	$("#tasksList").on('click', '.delete', deleteTasks);
	// update tasks
	$("#tasksList").on('click', '.update', updateTasks);
	// toggle complete checkbox
	$('#complete').on('click', '.complete', checkBoxComplete);

});

// Get tasks and append
function getToDo() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (toDo) {
			appendTasks(toDo);
		},
		error: function (error) {
			console.log('Database error', error);
		}
	});
}

// add tasks to DB
function submitToDo() {
	event.preventDefault();

	var data = {};

	$(this).serializeArray().forEach(function (input) {
		data[input.name] = input.value;
	});

	console.log('data: ', data);

	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: data,
		success: function (response) {
			getToDo();
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
			getToDo();
		},
		error: function (result) {
			console.log('task not deleted.');
		}
	});
} // end delete function

function updateTasks() {
	var id = $(this).parent().data('id');
	console.log(id);

	var chanageTask = {};

	var fields = $(this).parent().children().serializeArray();

	fields.forEach(function (field) {
		chanageTask[field.name] = field.value;
	});

	console.log(chanageTask);

	$.ajax({
		type: 'PUT',
		url: '/tasks/' + id,
		data: tasks,
		success: function (result) {
			console.log('yo, you got updated');
			getToDo();
		},

		error: function (result) {
			console.log('tasks not updated!');
		}
	});
} // end update function

function appendTasks(tasks) {
	var $toDoList = $('#toDoList');
	var $completeList = $('#completeList');
	$toDoList.empty();
	$completeList.empty();

	for (var i = 0; i < tasks.length; i++) {
		$("#toDoList").append('<div class="tasks row"></div>');

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
