function SocketService(io){

	io.on('connection', function(socket){
	  console.log('a user connected');
	  
	  socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });

	  socket.on('add task', function(task){
	  	io.emit('add task', task);
	    console.log('add task: ' + task.name);
	  });

	  socket.on('edit task', function(task){
	  	io.emit('edit task', task);
	    console.log('edit task: ' + task.name);
	  });

	  socket.on('delete task', function(id){
	  	io.emit('delete task', id);
	    console.log('delete task: ' + id);
	  });
	});
}

module.exports = SocketService;