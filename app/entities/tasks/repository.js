const mongoose = require('mongoose');

class Repository {

	findAll() {
		return this.findWhere({});
	}
	
	add(data) {
		return this.model.create(data);
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