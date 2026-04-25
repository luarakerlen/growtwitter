export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  username: string;
  photoUrl?: string;
}