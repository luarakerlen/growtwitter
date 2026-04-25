import { TweetDto, UserDto } from "../dtos";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private username: string,
    private createdAt: Date,
    private updatedAt: Date,
    private tweets?: TweetDto[],
    private followers?: UserDto[],
    private following?: UserDto[],
    private relation?: any
  ) { }

  public withRelation(relation: any) {
    this.relation = relation;
    return this;
  }

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      tweets: this.tweets,
      followers: this.followers,
      following: this.following,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
