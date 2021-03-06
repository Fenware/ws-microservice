import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import http from "http";

import websocketsRouter from "./routes/wsRouter";
import { authMiddleware, authMiddlewareSocket } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();

const port = process.env.PORT || "3000";

app.set("port", port);

const server = http.createServer(app);

/* ---------- Inicializando Socket.io ---------- */
import SocketsController from "./controllers/SocketsController";

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(authMiddlewareSocket);

SocketsController.setSocket(io);
SocketsController.connect();
/* ---------------------------------------------- */

/* Middlewares */
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/ws", authMiddleware, websocketsRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

app.use(errorHandler);

server.listen(port);
/* server.on('error', onError); */
server.on("listening", () => {
  console.log(`Listening on http://localhost:${port}`);
});
