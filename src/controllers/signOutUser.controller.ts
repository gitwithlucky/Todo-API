import { Request, Response } from "express";
import signOutUserService from "../services/signOutUser.service";
import { sendSuccess } from "../utils/app.controller";
import { sendError } from "../utils/app.controller";

const signOutUser = async (req: Request, response: Response) => {
  const { isSuccess, message, code } = await signOutUserService({
    req,
    response,
    cookies: req.cookies,
  });
  if (isSuccess) {
    return sendSuccess({ response, message });
  }

  return sendError({ response, message, code });
};

export default signOutUser;
