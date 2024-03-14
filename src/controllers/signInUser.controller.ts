import { Response, Request } from "express";
import signInUserService from "../services/signInUser.service";
import {
  sendError,
  sendSuccess,
} from "../utils/app.controller";
import { validationSchemas } from "../utils/validationSchema";
import validate from "../utils/validator";
import config from "../configs/config";

const signInUser = async (req: Request, response: Response) => {
  try {
    // Validate the signin request body
    const { errors, data } = validate(validationSchemas.siginSchema, req.body);
    // Return error if the validation fails
    if (errors) return sendError({ response, errors });
    // Process the signin request
    const { isSuccess, user, message, accessToken, refreshToken } = await signInUserService(
      data
    );
    // Return success message
    if (isSuccess) {
      // Save cookie to httpOnly
      response.cookie(config.authName, refreshToken, {
        path: "/",
        httpOnly: true,
        secure: config.development ? false : true,
        sameSite: config.development ? "none" : "strict",
      });
      return sendSuccess({ response, data: { user, accessToken } });
    }
    // Return
    return sendError({ response, message });
  } catch (error) {
    // Get the message
    const { message } = error;
    // Return the error message
    return sendError({ response, message });
  }
};

export default signInUser;
