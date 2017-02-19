var $$addTask = document.getElementById('add-task');
var $$taskContainer = document.getElementById('tasks-container');
var $$getnNumber = document.getElementById('get-fibonacci');
var $$fibonacciNumber = document.getElementById('fibonacci-number');

var socket = io.connect('http://localhost:4444');

fetch('/api/task').then(function(response){
	if(response.ok) {
		return response.json();
	} 
}).then(function(tasks){
	renderTasks(tasks);
});

bindEventListeners();

function bindEventListeners(){

	$$addTask.addEventListener('click', function(){
		renderTask();
	});

	$$getnNumber.addEventListener('click', function(){
		getFibonacciNumber();
	});

	document.addEventListener('click', function(event){
		var $taskContainer = event.target.parentNode;
		if (event.target.className === 'save-task'){
			var id = $taskContainer.id;
			if (id){
				editTask($taskContainer);
			} else {
				addTask($taskContainer);
			}
		} else if (event.target.className === 'delete-task'){
			deleteTask($taskContainer)
		}
	});
}

//Fibonacci

function getFibonacciNumber(){
	sendGetFibonacciReq().then(function(response){
		if(response.ok) {
			return response.json();
		}
	}).then(function(response){
			socket.emit('get number', response.number);
	}).catch(alert);
}

//Render function

function renderTasks(tasks){
	for (var i = 0; i < tasks.length; i++){
		renderTask(tasks[i]);
	}
}

function renderTask(task = {}){
	var $taskContainer = document.createElement('div');
	$taskContainer.className = 'task-container';

	if (task._id){
		$taskContainer.id = task._id

		var $taskId = document.createElement('span');
		$taskId.innerText = task._id;
		$taskContainer.appendChild($taskId);
	}

	var $taskName = document.createElement('input');
	$taskName.value = task.name || '';
	$taskName.className = 'task-name'
	$taskContainer.appendChild($taskName);

	var $saveTaskButton = document.createElement('button');
	$saveTaskButton.innerText = 'Save';
	$saveTaskButton.className = 'save-task'
	$taskContainer.appendChild($saveTaskButton);

	var $deleteTaskButton = document.createElement('button');
	$deleteTaskButton.innerText = 'Delete';
	$deleteTaskButton.className = 'delete-task'
	$taskContainer.appendChild($deleteTaskButton);

	$$taskContainer.appendChild($taskContainer);
}

// socket

socket.on('add task', function(task){
	renderTask(task);
});

socket.on('edit task', function(task){
	const $task = document.getElementById(task._id);
	$task.querySelector('input.task-name').value = task.name;
});

socket.on('delete task', function(id){
	const $task = document.getElementById(id);
	$task.remove();
});

socket.on('get number', function(number){
	$$fibonacciNumber.innerText = number;
});

//Handlers

function addTask(taskContainer){
	sendCreateTaskReq(taskContainer).then(function(response){
		if(response.ok) {
			return response.json();
		} else {
			throw new Error('це зрада!');
		}
	}).then(function(task){
		socket.emit('add task', task);
	}).catch(alert);
	taskContainer.remove();
}

function editTask(taskContainer){
	sendEditTaskReq(taskContainer).then(function(response){
		if(response.ok) {
			return response.json();
		} else {
			throw new Error('це зрада!');
		}
	}).then(function(task){
		socket.emit('edit task', task);
	}).catch(alert);
}

function deleteTask(taskContainer){
	var id = taskContainer.id;
	socket.emit('delete task', id);
	sendDeleteTaskReq(id).then(function(response){
		if(response.ok) {
			return;
		} 
	}).then(function(){
		taskContainer.remove();
	});
}

// Requests
function sendGetFibonacciReq(){
	return fetch('/api/math/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}

function sendEditTaskReq(taskContainer){
	var name = taskContainer.querySelector('.task-name').value;

	return fetch('/api/task/' + taskContainer.id, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name
		})
	})
}

function sendDeleteTaskReq(id){
	return fetch('/api/task/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

function sendCreateTaskReq(taskContainer){
	var name = taskContainer.querySelector('.task-name').value;

	return fetch('/api/task/', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name
		})
	})
}