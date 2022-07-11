import { UserService } from "./UserService";
import { TokenService } from "./TokenService";
import { LinkService } from "./LinkService";
import { PlanService } from "./PlanService";

const userService = new UserService();
const tokenService = new TokenService();
const linkService = new LinkService();
const planService = new PlanService();

export { userService, tokenService, linkService, planService };
