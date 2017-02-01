function addTask(){
	var list = document.getElementById('list');
	var task = document.createElement('li');
	list.appendChild(task);
	
	var taskName = document.createElement('input');
	taskName.value = '';
	taskName.className = 'task-name'
	task.appendChild(taskName);

	var saveButton = document.createElement('button');
	saveButton.innerText = 'Save';
	saveButton.className = 'save-task'
	task.appendChild(saveButton);

	var deleteButton = document.createElement('button');
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete-task'
	task.appendChild(deleteButton);
}