import { TweetDto } from "./tweet.dto";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  username: string;
  tweets?: Partial<TweetDto>[];
  followers?: Partial<UserDto>[];
  following?: Partial<UserDto>[];
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

export interface LoginUserDto {
  emailOrUsername: string;
  password: string;
}

export type GetUserByEmailOrUsernameDto =
  | { email: string; username?: never }
  | { email?: never; username: string }
