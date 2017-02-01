const repository = require('./repository');

class Service {

	getAllTasks(){
		return repository.findAll();
	}

	addTask(task){
		return repository.add(task);
	}

	editTask(id, task){
		return repository.update({_id: id}, task);
	}

	deleteTask(id){
		return repository.delete({_id: id});
	}
}

module.exports = new Service();