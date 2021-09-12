import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/chat-rooms", (req: Request, res: Response) => {
  res.send({ message: "Acá va lo de websockets para las salas de chat" });
});

router.post("/chat-messages", (req: Request, res: Response) => {
  res.send({
    message: "Acá va lo de websockets para los mensajes de una sala de chat",
  });
});

export default router;
