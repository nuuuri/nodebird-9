import { Post } from './Post';

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  Posts: number;
  Followings: number;
  Followers: number;
}

export interface Me extends Omit<User, 'Posts' | 'Followings' | 'Followers'> {
  Posts: Post[];
  Followings: Pick<User, 'id' | 'nickname'>[];
  Followers: Pick<User, 'id' | 'nickname'>[];
}
