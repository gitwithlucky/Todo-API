import { todoRepository } from "../database/schemas/todo";

const deleteTodoItemService = async (data) => {
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
        message: "Cannot delete this document because you are not the creator",
      };
    }
    await todoRepository.deleteOne({ _id: id });
    return {
      isSuccess: true,
      message: "Request successful",
      todoItem,
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to delete Item" };
  }
};

export default deleteTodoItemService;
