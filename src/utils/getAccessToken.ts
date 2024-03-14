import { Request, Response } from "express";
import { sendError, sendSuccess } from "./app.controller";
import HttpStatusCode from "./HTTPStatusCode";
import jwt from "jsonwebtoken";
import config from "../configs/config";

const getAccessToken = (req: Request, response: Response) => {
  const cookies = req.cookies;
  if (!cookies?.JWTAuth)
    return sendError({
      response,
      code: HttpStatusCode.UNAUTHORIZED,
      message: "You are not authorised to access this resource",
    });

  const refreshToken = cookies.JWTAuth;
  jwt.verify(
    refreshToken,
    config.refreshTokenSecret,
    (err, userCredentials) => {
      if (err) return sendError({ response, code: HttpStatusCode.FORBIDDEN });
      const accessToken = jwt.sign(
        {
          email: userCredentials.email,
          username: userCredentials.username,
          id: userCredentials.id,
        },
        config.accessTokenSecret,
        { expiresIn: "300s" }
      );
      return sendSuccess({
        response,
        message: "Request successful",
        data: {
          accessToken,
        },
      });
    }
  );
};

export default getAccessToken;
