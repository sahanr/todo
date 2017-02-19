const express = require('express');
const math = express.Router();
const child_process = require('child_process');

math.get('/', (req, res, next) => {
	let child = child_process.fork(__dirname + '/fibonacci.js');
	child.on('message', number => {
		res.send(number);
	})
});

module.exports = math;