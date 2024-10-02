import type { Comment } from "./Comment";
import type { Image } from "./Image";
import type { User } from "./User";

export interface Post {
  id: number;
  User: User;
  content: string;
  Images: Image[];
  Comments: Comment[];
}
