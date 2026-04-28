import { TweetType } from "@prisma/client";
import { TweetDto } from "../dtos";

export class Tweet {
  constructor(
    private id: string,
    private content: string,
    private authorId: string,
    private type: TweetType,
    private createdAt: Date,
    private updatedAt: Date,
    private parentId?: string,
    private replies?: Partial<TweetDto>[],
  ) { }

  public withReplies(replies: Partial<TweetDto>[]) {
    this.replies = replies;
    return this;
  }

  public toJSON(): TweetDto {
    return {
      id: this.id,
      content: this.content,
      authorId: this.authorId,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      parentId: this.parentId,
      replies: this.replies,
    };
  }
}
