import type { Image, User, Comment } from "@/types";

export interface Post {
  id: number;
  User: User;
  content: string;
  Images: Image[];
  Comments: Comment[];
}
