import { UserService } from "./UserService";
import { TokenService } from "./TokenService";

const userService = new UserService();
const tokenService = new TokenService();

export { userService, tokenService };
