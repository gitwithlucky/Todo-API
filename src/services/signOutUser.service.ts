import { userRepository } from "../database/schemas/user";
import config from "../configs/config";
import HttpStatusCode from "../utils/HTTPStatusCode";

const signOutUserService =async (data) => {
  const { cookies, req, response } = data;
  if (!cookies.JWTAuth)
    return {
      response,
      code: HttpStatusCode.UNAUTHORIZED,
      message: "You are not authorised to access this resource",
    };
  const user = await userRepository.findByIdAndUpdate(
    req.user.id,
    { refreshToken: '' },
    { new: true }
  );
  response.clearCookie(config.authName, {
    path: "/",
    httpOnly: true,
    secure: config.development ? false : true,
    sameSite: config.development ? "none" : "strict",
  });

  return {
    isSuccess: true,
    message: "Sign out successful",
  };
};

export default signOutUserService;
