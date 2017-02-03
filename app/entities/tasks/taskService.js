const taskRepository = require('./taskRepository');

class TaskService {

	getAllTasks(){
		return taskRepository.findAll();
	}

	addTask(task){
		if(task.name.toUpperCase().indexOf('ЗРАДА') !== -1){
			throw new Error('це зрада!')
		}
		return taskRepository.add(task);
	}

	editTask(id, task){
		if(task.name.toUpperCase().indexOf('ЗРАДА') !== -1){
			throw new Error('це зрада!')
		}
		return taskRepository.findOneAndUpdate({_id: id}, task);
	}

	deleteTask(id){
		return taskRepository.delete({_id: id});
	}
}

module.exports = new TaskService();