import {HasId} from './HasId';

export type CommentOptions = HasId &  {
  id: string;
  userId: string;
  pictureId: string;
  content: string;
  createdAt: string;
};
