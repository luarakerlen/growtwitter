import { TweetDto, UserDto } from "../dtos";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private username: string,
    private createdAt: Date,
    private updatedAt: Date,
    private tweets?: Partial<TweetDto>[],
    private followers?: Partial<UserDto>[],
    private following?: Partial<UserDto>[],
  ) { }

  public withTweets(tweets: Partial<TweetDto>[]) {
    this.tweets = tweets;
    return this;
  }

  public withFollowers(followers: Partial<UserDto>[]) {
    this.followers = followers;
    return this;
  }

  public withFollowing(following: Partial<UserDto>[]) {
    this.following = following;
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
