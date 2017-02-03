const express = require('express');
const task = express.Router();

task.get('/', (req, res, next) => {
	res.render('tasks');
});

module.exports = task;
