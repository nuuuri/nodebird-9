import { Post } from './Post';

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  Posts: Post[];
  Followings: Pick<User, 'email' | 'nickname'>[];
  Followers: Pick<User, 'email' | 'nickname'>[];
}
