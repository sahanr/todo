const mongoose = require('mongoose');

const Task = new mongoose.Schema({
	name: String
});

Task.methods.getViewModel = function(){
	return {
		_id: this._id,
		name: this.name
	};
};

module.exports = mongoose.model('Task', Task);