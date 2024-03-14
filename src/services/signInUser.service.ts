import { userRepository } from "../database/schemas/user";
import { validatePassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import config from "../configs/config";

const signInUserService = async (data: any): Promise<any> => {
  const { email, password } = data;
  const user = await userRepository.findOne({ email });
  if (!user) {
    return { isSuccess: false, message: "Invalid email or password" };
  }

  // Validate  password
  const passwordIsValid = validatePassword(password, user.password);
  if (!passwordIsValid) {
    return { isSuccess: false, message: "Invalid email or password" };
  }

  const accessToken = jwt.sign(
    { email, username: user.username, id: user.id },
    config.accessTokenSecret,
    { expiresIn: "300s" }
  );

  const refreshToken = jwt.sign(
    { email, username: user.username, id: user.id },
    config.refreshTokenSecret,
    { expiresIn: "1d" }
  );

  const updatedUser = await userRepository.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true }
  );

  return {
    isSuccess: true,
    user: updatedUser,
    accessToken,
    refreshToken,
    message: "Sign in successful",
  };
};

export default signInUserService;
