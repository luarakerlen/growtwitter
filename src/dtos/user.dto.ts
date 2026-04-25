import { TweetDto } from "./tweet.dto";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  username: string;
  tweets?: TweetDto[];
  followers?: UserDto[];
  following?: UserDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  username: string;
  photoUrl?: string;
}