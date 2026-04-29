import { LikeRepository } from "../database";
import { LikeService } from "../services";
import { LikeController } from "../controllers";

const likeRepository = new LikeRepository();
const likeService = new LikeService(likeRepository);
export const likeController = new LikeController(likeService);
