import { todoRepository } from "../database/schemas/todo";

const fetchTodoItemService = async (data) => {
  try {
    const { id, initiator } = data;
    const todoItem = await todoRepository.findById(id);
    //check if item exists--- error handling
    if (!todoItem) {
      return {
        isSuccess: false,
        message: "Todo Item not found",
      };
    }
    if (todoItem.initiator.toString() !== initiator) {
      return {
        isSuccess: false,
        message: "Cannot fetch this document because you are not the creator",
      };
    }
    return {
      isSuccess: true,
      message: "Request successful",
      todoItem,
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to fetch Item" };
  }
};

export default fetchTodoItemService;
