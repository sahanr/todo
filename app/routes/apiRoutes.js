const tasks = require('../entities/tasks/taskAPIRoutes');
const math = require('../entities/fibonacci/fibonacciAPIRoutes');

const initializeRoutes = (app) => {
	app.use('/api/math', math);
	app.use('/api/task', tasks);
}

module.exports = initializeRoutes;