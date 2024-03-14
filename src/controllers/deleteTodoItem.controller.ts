import {Request, Response } from "express";
import { sendSuccess } from "../utils/app.controller";
import { sendError } from "../utils/app.controller";
import { validationSchemas } from "../utils/validationSchema";
import validate from "../utils/validator";
import deleteTodoItemService from "../services/deleteTodoItem.service";

const deleteTodoItem = async (req: any, response: Response) => {
    const { errors, data } = validate(validationSchemas.fetchTodoSchema, {
        ...req.params,
      });
      if (errors) {
        return sendError({ response, errors });
      }
      console.log(data)
      const { isSuccess, message, todoItem } = await deleteTodoItemService({
        ...data,
        initiator: req?.user.id,
      });
      if (isSuccess) {
        return sendSuccess({ response, data: todoItem, message });
      }
    
      return sendError({ response, message });
}

export default deleteTodoItem