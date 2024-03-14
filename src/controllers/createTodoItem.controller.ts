import { Request, Response } from "express";
import validate from "../utils/validator";
import { validationSchemas } from "../utils/validationSchema";
import { sendError, sendSuccess } from "../utils/app.controller";
import createTodoItemService from "../services/createTodoItem.service";

const createTodoItem = async (req: any, response: Response) => {
  const { errors, data } = validate(
    validationSchemas.createTodoSchema,
    req.body
  );
  if (errors) {
    return sendError({ response, errors });
  }
  const { isSuccess, message, todoItem } = await createTodoItemService({
    ...data,
    initiator: req?.user?.id
  })
  if (isSuccess) {
    return sendSuccess({ response, data: todoItem, message });
  }

  return sendError({ response, message });
};

export default createTodoItem;
