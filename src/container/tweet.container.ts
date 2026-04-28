import { TweetRepository } from "../database";
import { TweetService } from "../services";
import { TweetsController } from "../controllers";

const tweetRepository = new TweetRepository()
const tweetService = new TweetService(tweetRepository);
export const tweetController = new TweetsController(tweetService)