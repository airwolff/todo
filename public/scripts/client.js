$(document).ready(function () {
	getBooks();

	// add a book
	$('#addTask').on('click', addTask);
	// delete a book
	$("#taskList").on('click', '.delete', deleteTask);
	// update a book
	$("#taskList").on('click', '.update', updateTask);
});

// Get tasks and append
function getTasks() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (tasks) {
			appendTask(task);
		},
		error: function () {
			console.log('Database error');
		}

	});
}

// add task to DB
function addTask() {
	event.preventDefault();

	var task = {};

	$.each($('#taskInput').serializeArray(), function (i, field) {
		task[field.name] = field.value;
	});

	console.log('task: ', task);

	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: book,
		success: function (response) {
			getTasks();
		},
		error: function () {
			console.log('task not posted');
		}
	});
} // end add function


// delete tasks
function deleteTask() {
	var id = $(this).parent().data('id');
	console.log(id);

	$.ajax({
		type: 'DELETE',
		url: '/tasks/' + id,
		success: function (result) {
			getBooks();
		},
		error: function (result) {
			console.log('task not deleted.');
		}
	});
} // end delete function

function updateTask() {
	var id = $(this).parent().data('id');
	console.log(id);

	var task = {};
	var fields = $(this).parent().children().serializeArray();
	fields.forEach(function (field) {
		task[field.name] = field.value;
	});
	console.log(task);

	$.ajax({
		type: 'PUT',
		url: '/change/' + id,
		data: task,
		success: function (result) {
			console.log('yo, you got updated');
			getBooks();
		},
		error: function (result) {
			console.log('task not updated!');
		}
	});
} // end update function

function appendTask(task) {
	$("#taskList").empty();

	for (var i = 0; i < task.length; i++) {
		$("#taskList").append('<div class="row book"></div>');
		$el = $('#taskList').children().last();
		var task = books[i];
		$el.data('id', book.id);
		console.log("Date from DB: ", book.published);
		$el.append('<input type="text" name="task" value="' + tasks.task + '" />');
		$el.append('<input type="text" name="author" value="' + book.author + '" />');

		$el.append('<button class="update">Update</button>');
		$el.append('<button class="delete">Delete</button>');
	}
}
