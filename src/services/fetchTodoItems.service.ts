import { userRepository } from "../database/schemas/user";
import { todoRepository } from "../database/schemas/todo";

const fetchTodoItemsService = async (data) => {
  try {
    const { initiator } = data;
    const currentUser = await userRepository.findById(initiator);
    //check if user was found
    if (!currentUser) {
        return {
          isSuccess: false,
          message: "Invalid User",
        };
      }
    let todoItems;
    if (currentUser.is_admin) {
      todoItems = await todoRepository.find();
    } else {
      todoItems = await todoRepository.find({ initiator });
    }
    return {
      isSuccess: true,
      message: "Request successful",
      todoItems,
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to fetch Items" };
  }
};

export default fetchTodoItemsService;
