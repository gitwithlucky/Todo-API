import { Router, Request, Response } from "express";
import createTodoItem from "../controllers/createTodoItem.controller";
import deleteTodoItem from "../controllers/deleteTodoItem.controller";
import fetchTodoItem from "../controllers/fetchTodoItem.controller";
import fetchTodoItems from "../controllers/fetchTodoItems.controller";
import updateTodoItem from "../controllers/updateTodoItem.controller";
import { sendError } from "../utils/app.controller";
import registerUser from "../controllers/registerUser.controller";
import signInUser from "../controllers/signInUser.controller";
import signOutUser from "../controllers/signOutUser.controller";
import verifyJWT from "../utils/verifyJWT";
import getAccessToken from "../utils/getAccessToken";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/signin", signInUser);
router.get('/get_token', getAccessToken)

router.post("/create_item",verifyJWT, createTodoItem);
router.get("/fetch_item/:id", verifyJWT, fetchTodoItem);
router.get("/fetch_items", verifyJWT, fetchTodoItems);
router.put("/update_item/:id", verifyJWT, updateTodoItem);
router.delete("/delete_item/:id", verifyJWT, deleteTodoItem);
router.post("/signout", verifyJWT, signOutUser);

//Do User CRUD

router.all("*", (_req: Request, _res: Response) => {
  return sendError({
    response: _res,
    errors: {},
    message: "Unsupported Request URL or Method",
    code: 405
})
});

export default router;
