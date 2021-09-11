const express = require('express');

const router = express.Router();

router.get('/chat-rooms', (req, res) => {
  res.send({ message: 'Acá va lo de websockets para las salas de chat' });
});

router.get('/chat-messages', (req, res) => {
  res.send({ message: 'Acá va lo de websockets para los mensajes de una sala de chat' });
});

module.exports = router;
