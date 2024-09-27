import type { User } from "./User";

export interface Comment {
  User: User;
  content: string;
}
