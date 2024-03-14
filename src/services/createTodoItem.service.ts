import { todoRepository } from "../database/schemas/todo";

const createTodoItemService = async (data) => {
  try {
    const todoItem = await todoRepository.create(data);
    //check if item wasnt created--- error handling

    return {
      isSuccess: true,
      message: "Todo Item created successfully",
      todoItem
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to create Item" };
  }
};

export default createTodoItemService;
