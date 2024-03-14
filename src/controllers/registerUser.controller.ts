import { Request, Response } from "express";
import validate from "../utils/validator";
import { validationSchemas } from "../utils/validationSchema";
import { sendError, sendSuccess } from "../utils/app.controller";
import registerUserService from "../services/registerUser.service";

const registerUser = async (req: Request, response: Response) => {
    const { errors, data } = validate(
        validationSchemas.createUserSchema,
        req.body
      );
      if (errors) {
        return sendError({ response, errors });
      }
    
      const { isSuccess, message, newUser } = await registerUserService(data)
      if (isSuccess) {
        return sendSuccess({ response, data: newUser, message });
      }
      return sendError({ response, message });
}

export default registerUser