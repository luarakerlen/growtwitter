import { FollowRepository } from "../database";
import { FollowService } from "../services";
import { FollowController } from "../controllers";

const followRepository = new FollowRepository();
const followService = new FollowService(followRepository);
export const followController = new FollowController(followService);
