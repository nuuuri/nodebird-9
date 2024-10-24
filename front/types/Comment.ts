import { User } from './User';

export interface Comment {
  id: number;
  content: string;
  User: Pick<User, 'id' | 'nickname'>;
  PostId: number;
}
