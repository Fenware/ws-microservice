/* eslint-disable prefer-const */
import {Request, Response, NextFunction} from "express";
import axios from 'axios';
import createHttpError from "http-errors";

const authMiddleware = (req : Request, res: Response, next : NextFunction) => {
  if ('authorization' in req.headers) {
    let { API_URL } = process.env;
    axios({
      method: 'post',
      url: `${API_URL}/token`,
      data: {},
      headers: req.headers,
    })
      // eslint-disable-next-line no-shadow
      .then((response) => {
        console.log(response.data);
        
        if (response.data === 'OK') {
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

export default authMiddleware;