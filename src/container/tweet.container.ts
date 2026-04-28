import { TweetRepository } from "../database";
import { TweetService } from "../services";
import { TweetController } from "../controllers";

const tweetRepository = new TweetRepository()
const tweetService = new TweetService(tweetRepository);
export const tweetController = new TweetController(tweetService)