function SocketService(server){

	const io = require('socket.io')(server);

	io.on('connection', function(socket){
	  console.log('a user connected');
	  
	  socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	  socket.on('add task', function(task){
	  	io.emit('add task', task);
	    console.log('add task: ' + task.name);
	  });

	  socket.on('edit task', function(name){
	  	io.emit('edit task', name);
	    console.log('edit task: ' + name);
	  });

	  socket.on('delete task', function(name){
	  	io.emit('delete task', name);
	    console.log('delete task: ' + name);
	  });
	});
}

module.exports = SocketService;