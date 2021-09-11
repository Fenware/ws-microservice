const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const app = express();

const port =  process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

/* ---------- Inicializando Socket.io ---------- */
const io = socketio(server, {
  cors: {
    /* origin: '*', */
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
});
/* ---------------------------------------------- */


/* Router y middleware */
const websocketsRouter = require('./routes/wsRouter');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');


/* Middlewares */
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ws', authMiddleware, websocketsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`); // eslint-disable-line no-console
}

server.listen(port);
/* server.on('error', onError); */
server.on('listening', onListening);

/* module.exports = app; */
