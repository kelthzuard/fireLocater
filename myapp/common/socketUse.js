function prepareSocketIO(server) {
  var io = socket_io.listen(server);
  io.on('connection',  function(socket) {
    console.log('client connect server, ok!');
  
    // io.emit()方法用于向服务端发送消息，参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
    io.emit('server message', {msg:'client connect server success'});
  
    // socket.broadcast.emmit()表示向除了自己以外的客户端发送消息
    socket.broadcast.emit('server message', {msg:'broadcast'});
  
    // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
    socket.on('disconnect', function() {
      console.log('connect disconnect');
    });
    
    // 与客户端对应的接收指定的消息
    socket.on('client message', function(data) {
      console.log(data);// hi server
    });
  
  });
}

module.exports = socketUse;