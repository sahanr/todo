bindEventListeners();

function addTask(task = {}){
	var list = document.getElementById('list');
	var task = document.createElement('li');
	list.appendChild(task);

	if (task._id){
		task.id = task._id

		var id = document.createElement('span');
		id.innerText = task._id;
		task.appendChild(id);
	}

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

function bindEventListeners(){

	document.addEventListener('click', function(event){
		if (event.target.className === 'save-task'){
			var task = event.target.parentNode;
			var id = task.id;
			console.log('sdf')
			if (id){
				sendEditTaskReq(task, id);
			} else {
				sendCreateTaskReq(task).then(function(response){
					if(response.ok) {
						return response.json();
					} 
				}).then(function(task){
					task.appendChild(renderUser(task));
				});
				task.remove();
			}
		} else if (event.target.className === 'delete-user'){
			var userContainer = event.target.parentNode;
			var id = userContainer.id;
			
			sendDeleteUserReq(id).then(function(response){
				if(response.ok) {
					return;
				} 
			}).then(function(){
				userContainer.remove();
			});
		}
	});

}

function sendCreateTaskReq(task){

	var name = task.querySelector('.task-name').value;

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