import {UserOptions} from './UserOptions';
import {CommentOptions} from './CommentOptions';
import {DocumentType} from './DocumentType';
import {Document} from './Document';

export type DocumentOptions = {
  id: number;
  type: DocumentType;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  owner: UserOptions;
  comments: CommentOptions[];
  parent: Document;
  children: DocumentOptions[];
};
