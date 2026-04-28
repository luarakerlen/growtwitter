import { TweetType } from "@prisma/client";

export interface TweetDto {
  id: string;
  content: string;
  authorId: string;
  type: TweetType;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  replies?: Partial<TweetDto>[];
}

export interface CreateTweet {
  content: string;
  authorId: string;
}

export interface CreateTweetDto extends CreateTweet {
  type: TweetType;
  parentId?: string;
}
