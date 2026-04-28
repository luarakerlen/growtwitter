import { TweetType } from "@prisma/client";
import { LikeDto, TweetDto } from "../dtos";

export class Tweet {
  constructor(
    private id: string,
    private content: string,
    private authorId: string,
    private type: TweetType,
    private createdAt: Date,
    private updatedAt: Date,
    private parentId?: string,
    private likes?: LikeDto[],
    private replies?: Partial<TweetDto>[],
  ) { }

  public withLikes(likes: LikeDto[]) {
    this.likes = likes;
    return this;
  }

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
      likes: this.likes,
      replies: this.replies,
    };
  }
}
