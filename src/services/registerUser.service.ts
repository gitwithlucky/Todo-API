import { userRepository } from "../database/schemas/user";
import { generateHash } from "../utils/hashPassword";

const registerUserService = async (
  data: any
): Promise<{
  isSuccess: Boolean;
  message: string;
  newUser?: any;
}> => {
  try {
    const { first_name, last_name, email, password, username, is_admin } = data;

    const existingUsers = await userRepository.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUsers) {
      return {
        isSuccess: false,
        message: "Unable to create User. Email or Username already exists",
      };
    }
    const pwd = generateHash(password);
    const newUser: any = await userRepository.create({
      first_name,
      last_name,
      email,
      password: pwd,
      username,
      is_admin,
    });

    return {
      isSuccess: true,
      message: "User successfully created",
      newUser
    };
  } catch (error) {
    console.log(">>>>", error.message);
    return { isSuccess: false, message: "Failed to create User" };
  }
};

export default registerUserService;
