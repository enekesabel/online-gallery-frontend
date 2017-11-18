import {UserOptions} from './UserOptions';
import {HasId} from "./HasId";

export type CommentOptions = HasId &  {
  id: number;
  user: UserOptions;
  content: string;
  createdAt: string;
};
