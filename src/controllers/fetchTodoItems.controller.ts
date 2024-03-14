import {Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/app.controller";
import fetchTodoItemsService from "../services/fetchTodoItems.service";

const fetchTodoItem = async (req: any, response: Response) => {
      const { isSuccess, message, todoItems } = await fetchTodoItemsService({
        initiator: req?.user.id
      })
      if (isSuccess) {
        return sendSuccess({ response, data: todoItems, message });
      }
    
      return sendError({ response, message });
}

export default fetchTodoItem