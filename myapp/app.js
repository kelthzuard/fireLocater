var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socket_io = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.ready=function(server){
  var io = socket_io.listen(server);
  global.io = io;
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
};

module.exports = app;
