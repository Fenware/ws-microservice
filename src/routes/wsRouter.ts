import {Router, Request, Response} from "express";

/* const SocketIoController = require('../controllers/SocketIoController'); */

/* const socket = new SocketIoController(); */

const router: Router = Router();

router.post('/chat-rooms', (req: Request, res: Response) => {
  res.send({ message: 'Acá va lo de websockets para las salas de chat' });
});

router.post('/chat-messages', (req: Request, res: Response) => {
  res.send({
    message: 'Acá va lo de websockets para los mensajes de una sala de chat',
  });

 /*  const io = SocketIoController.getConnection();
  io.on("chat:message", (data: any) => {
    console.log(data);
  }); */
});

export default router;
