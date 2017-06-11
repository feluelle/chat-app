const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'static/assets')));

app.get('/', (req, res) => {
    res.render('index', {title: 'chat'});
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('is typing', () => {
        console.log('is typing..');
        socket.broadcast.emit('is typing', 'is typing');
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});