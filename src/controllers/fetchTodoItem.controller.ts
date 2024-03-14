import {Request, Response } from "express";
import validate from "../utils/validator";
import { validationSchemas } from "../utils/validationSchema";
import { sendError, sendSuccess } from "../utils/app.controller";
import fetchTodoItemService from "../services/fetchTodoItem.service";

const fetchTodoItem = async (req: any, response: Response) => {
    const { errors, data } = validate(
        validationSchemas.fetchTodoSchema,
        req.params
      );
      if (errors) {
        return sendError({ response, errors });
      }
      
      const { isSuccess, message, todoItem } = await fetchTodoItemService({
        ...data,
        initiator: req?.user.id
      })
      if (isSuccess) {
        return sendSuccess({ response, data: todoItem, message });
      }
    
      return sendError({ response, message });
}

export default fetchTodoItem