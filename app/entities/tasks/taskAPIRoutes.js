const express = require('express');
const task = express.Router();

const service = require('./taskService');

task.get('/', (req, res, next) => {
	service.getAllTasks().then((tasks) => {
		res.send(tasks);
	}).catch((err) => {
		res.status(400).end();
	});
});

task.post('/', (req, res, next) => {
	service.addTask(req.body).then((task) => {
		res.status(201).send(task);
	}).catch((err) => {
		res.status(400).end();
	});
});

task.put('/:id', (req, res, next) => {
	service.editTask(req.params.id, req.body).then(() => {
		res.end();
	}).catch((err) => {
		res.status(400).end();
	});
});

task.delete('/:id', (req, res, next) => {
	service.deleteTask(req.params.id).then(() => {
		res.status(200).end();
	}).catch((err) => {
		res.status(400).end();
	});
});

module.exports = task;