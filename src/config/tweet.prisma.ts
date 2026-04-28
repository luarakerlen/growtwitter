
import { Prisma, Tweet } from "@prisma/client";

export const tweetWithRelations = Prisma.validator<Prisma.TweetDefaultArgs>()({
  include: {
    replies: true,
  }
});

type TweetWithRelations = Prisma.TweetGetPayload<typeof tweetWithRelations>;

export type TweetPartialRelations = Tweet & Partial<TweetWithRelations>;