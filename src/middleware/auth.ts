/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import createHttpError from "http-errors";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ("authorization" in req.headers) {
    let { API_URL } = process.env;
    axios({
      method: "post",
      url: `${API_URL}/token`,
      data: {},
      headers: req.headers,
    })
      // eslint-disable-next-line no-shadow
      .then((response) => {
        console.log(response.data);

        if (response.data === "OK") {
          next();
        } else {
          res.status(401).send(new createHttpError.Unauthorized());
        }
      })
      .catch((error) => {
        res.status(401).send(new createHttpError.Unauthorized());
      });
  } else {
    res.status(401).send(new createHttpError.Unauthorized());
  }
};

export const authMiddlewareSocket = (socket: any, next: NextFunction) => {
  if ("Authorization" in socket.handshake.auth.token) {
    let { API_URL } = process.env;
    axios({
      method: "post",
      url: `${API_URL}/token`,
      data: {},
      headers: socket.handshake.auth.token,
    })
      // eslint-disable-next-line no-shadow
      .then((response) => {
        console.log(response.data);

        if (response.data === "OK") {
          next();
        } else {
          next(new createHttpError.Unauthorized());
        }
      })
      .catch((error) => {
        console.log(error);
        next(new createHttpError.Unauthorized());
      });
  } else {
    next(new createHttpError.Unauthorized());
  }
};
