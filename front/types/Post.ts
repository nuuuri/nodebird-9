import type { Comment } from './Comment';
import type { Image } from './Image';
import type { User } from './User';

export interface Post {
  id: number;
  User: Pick<User, 'id' | 'nickname'>; // 작성자
  content: string;
  Images: Image[];
  Comments: Comment[];
  Likers: Pick<User, 'id'>[];
  Retweet?: Post;
  createdAt: Date;
  updatedAt: Date;
}
