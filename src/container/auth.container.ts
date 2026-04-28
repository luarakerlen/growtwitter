import { UserRepository } from "../database";
import { UserService } from "../services";
import { UserController } from "../controllers";

const userRepository = new UserRepository()
const userService = new UserService(userRepository);
export const authController = new UserController(userService)