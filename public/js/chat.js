const socket = io.connect();

sendMsgBtn.onclick = () => {
	const name = nameInp.value;
	const msg = msgInp.value;

	if (name && msg) {
		socket.emit('send msg', { name, msg });
		msgInp.value = '';
	}
};

socket.on('new msg', (data) => {
	const li = document.createElement('li');
	const b = document.createElement('b');
	const span = document.createElement('span');

	b.innerText = `${data.name}: `;
	span.innerText = data.msg;
	li.append(b, span);

	msgList.append(li);
});
