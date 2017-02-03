const tasks = require('../entities/tasks/taskAPIRoutes');

const initializeRoutes = (app) => {
	app.use('/api/task', tasks);
}

module.exports = initializeRoutes;