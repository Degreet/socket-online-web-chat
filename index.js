const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;
app.use(express.static('public'));

app.get('/', (req, resp) => {
	resp.sendFile(__dirname + '/public/index.html');
});

const connections = [];

io.sockets.on('connection', (socket) => {
	connections.push(socket);
	console.log('подключен новый пользователь');

	socket.on('disconnect', (data) => {
		connections.splice(connections.indexOf(data), 1);
		console.log('пользователь отключился');
	});

	socket.on('send msg', (data) => {
		io.sockets.emit('new msg', data);
	});
});

server.listen(port);
