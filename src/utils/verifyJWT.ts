import { Response } from "express";
import { sendError } from "./app.controller";
import HttpStatusCode from "./HTTPStatusCode";
import jwt from "jsonwebtoken";
import config from "../configs/config";

const verifyJWT = (req: any, response: Response, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return sendError({
      response,
      code: HttpStatusCode.UNAUTHORIZED,
      message: "You do not have authorization to access this resource",
    });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.accessTokenSecret, (err, userCredentials) => {
    if (err) {
      return sendError({
        response,
        code: HttpStatusCode.FORBIDDEN,
        message: "Invalid access token",
      });
    } else {
      req.user = userCredentials;
      next()
    }
  });

};

export default verifyJWT
