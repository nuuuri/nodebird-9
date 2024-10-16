import type { User } from './User';

export interface Comment {
  id: number;
  User: Pick<User, 'email' | 'nickname'>;
  content: string;
}
