export class Follow {
  constructor(
    private followerId: string,
    private followingId: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) { }


  public toJSON() {
    return {
      followerId: this.followerId,
      followingId: this.followingId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
