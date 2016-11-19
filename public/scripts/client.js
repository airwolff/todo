$(document).ready(function () {
	getBooks();

	// add a book
	$('#addTask').on('click', addTask);
	// delete a book
	$("#deleteTask").on('click', '.delete', deleteTask);
	// update a book
	$("#updateTask").on('click', '.update', updateTask);
});

// Get tasks and append
function getTasks() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
		success: function (task) {
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
		data: book,
		success: function (result) {
			console.log('updated!!!!');
			getBooks();
		},
		error: function (result) {
			console.log('task not updated!');
		}
	});
} // end update function
