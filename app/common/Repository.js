const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Repository {

	findWhere(props) {
		const query = this.model.find(props);
		return query.exec();
	}

	findAll() {
		return this.findWhere({});
	}

	add(data) {
		return this.model.create(data);
	}

	findOneAndUpdate(queryObj, body) {
		if (queryObj && queryObj._id){
			queryObj._id = ObjectId(queryObj._id);
		}
		const query = this.model.findOneAndUpdate(queryObj, body, { new: true });
		return query.exec();
	}

	update(queryObj, obj) {
		var query = this.model.update(queryObj, obj);
		return query.exec();
	}

	delete(obj) {
		const query = this.model.remove(obj);
		return query.exec();
	}
}

module.exports = Repository;