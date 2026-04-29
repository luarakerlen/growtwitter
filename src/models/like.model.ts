export class Like {
  constructor(
    private userId: string,
    private tweetId: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) { }


  public toJSON() {
    return {
      userId: this.userId,
      tweetId: this.tweetId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
