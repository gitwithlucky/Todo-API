import { Request, Response } from "express";
import { sendSuccess } from "../utils/app.controller";
import { sendError } from "../utils/app.controller";
import { validationSchemas } from "../utils/validationSchema";
import validate from "../utils/validator";
import updateTodoItemService from "../services/updateTodoItem.service";

const updateTodoItem = async (req: any, response: Response) => {
  const { errors, data } = validate(validationSchemas.fetchTodoSchema, {
    ...req.params,
    ...req.body,
  });
  if (errors) {
    return sendError({ response, errors });
  }
  const { isSuccess, message, updateItem } = await updateTodoItemService({
    ...data,
    initiator: req?.user.id,
  });
  if (isSuccess) {
    return sendSuccess({ response, data: updateItem, message });
  }

  return sendError({ response, message });
};

export default updateTodoItem;
