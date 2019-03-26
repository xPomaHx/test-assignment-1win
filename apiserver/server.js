const io = require('socket.io');

const port = process.env.port || 80;

const server = io.listen(port, {
  path: '/',
});
console.dir(`listen socketio port: ${port}`);

server.on('connection', (socket, data) => {
  socket.emit('sport-list', [
    {
      id: 1,
      name: 'Футбол',
    },
    {
      id: 2,
      name: 'Рэгби',
    },
    {
      id: 3,
      name: 'Гандбол',
    },
    {
      id: 4,
      name: 'Хоккей',
    },
    {
      id: 5,
      name: 'Автоспорт',
    },
    {
      id: 6,
      name: 'Теннис',
    },
  ]);

  socket.on('get-sport', data => {
    const { id } = data;

    const result = [];

    for (let i = 0; i < 1e2 * id; i++) {
      result.push((Math.random() * 1e10).toString(32));
    }

    socket.emit('get-sport', { response: result, meta: data });
  });
});
