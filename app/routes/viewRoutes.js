const tasks = require('../entities/tasks/taskViewRoutes');

const initializeRoutes = (app) => {
	app.use('/', tasks);
}

module.exports = initializeRoutes;