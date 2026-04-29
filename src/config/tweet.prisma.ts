
import { Prisma, Tweet } from "@prisma/client";

export const tweetWithRelations = Prisma.validator<Prisma.TweetDefaultArgs>()({
  include: {
    replies: true,
    likes: true,
  }
});

type TweetWithRelations = Prisma.TweetGetPayload<typeof tweetWithRelations>;

export type TweetPartialRelations = Tweet & Partial<TweetWithRelations>;

export const feedTweets = Prisma.validator<Prisma.TweetDefaultArgs>()({
  include: {
    author: {
      select: {
        id: true,
        name: true,
        username: true,
      }
    },
    likes: true,
  }
})

export type FeedTweets = Prisma.TweetGetPayload<typeof feedTweets>;