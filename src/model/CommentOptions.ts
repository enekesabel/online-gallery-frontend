import {UserOptions} from './UserOptions';

export type CommentOptions = {
  id: number;
  user: UserOptions;
  content: string;
  createdAt: string;
};
