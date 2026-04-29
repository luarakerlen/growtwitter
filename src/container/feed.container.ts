import { FeedController } from "../controllers";
import { FollowRepository, TweetRepository } from "../database";
import { FeedService } from "../services";

const followRepository = new FollowRepository();
const tweetRepository = new TweetRepository();
const feedService = new FeedService(followRepository, tweetRepository);
export const feedController = new FeedController(feedService);
