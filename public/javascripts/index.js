var $$addTask = document.getElementById('add-task');
var $$taskContainer = document.getElementById('tasks-container');

var socket = io.connect('http://localhost:4444');

fetch('/api/task').then(function(response){
	if(response.ok) {
		return response.json();
	} 
}).then(function(tasks){
	renderTasks(tasks);
});

bindEventListeners();

function renderTasks(tasks){
	for (var i = 0; i < tasks.length; i++){
		$$taskContainer.appendChild(renderTask(tasks[i]));
	}
}

socket.on('add task', function(task){
	renderTask(task)
});

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
	return $taskContainer;
}

function bindEventListeners(){

	$$addTask.addEventListener('click', function(){
		$$taskContainer.appendChild(renderTask());
	});

	document.addEventListener('click', function(event){
		if (event.target.className === 'save-task'){
			var taskContainer = event.target.parentNode;
			var id = taskContainer.id;
			if (id){
				sendEditTaskReq(taskContainer, id);
			} else {
				sendCreateTaskReq(taskContainer).then(function(response){
					if(response.ok) {
						return response.json();
					} 
				}).then(function(task){
					socket.emit('add task', task);
					$$taskContainer.appendChild(renderTask(task));
				});
				taskContainer.remove();
			}
		} else if (event.target.className === 'delete-task'){
			var taskContainer = event.target.parentNode;
			var id = taskContainer.id;
			
			sendDeleteTaskReq(id).then(function(response){
				if(response.ok) {
					return;
				} 
			}).then(function(){
				taskContainer.remove();
			});
		}
	});

}

function sendEditTaskReq(taskContainer, id){
	var name = taskContainer.querySelector('.task-name').value;

	return fetch('/api/task/' + id, {
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