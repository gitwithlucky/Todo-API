import { todoRepository } from "../database/schemas/todo";

const updateTodoItemService = async (data) => {
  try {
    const { id, initiator, ...toUpdateData } = data;
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
        message: "Cannot update this document because you are not the creator",
      };
    }
    const updateItem = await todoRepository.findByIdAndUpdate(
      id,
      toUpdateData,
      { new: true }
    );
    return {
      isSuccess: true,
      message: "Request successful",
      updateItem,
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to update Item" };
  }
};

export default updateTodoItemService;
