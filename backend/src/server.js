const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const conectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    conectedUsers[user] = socket.id;
});

 mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-9ofbv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.conectedUsers = conectedUsers;

    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);