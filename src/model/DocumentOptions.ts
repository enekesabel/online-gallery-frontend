import {CommentOptions} from './CommentOptions';
import {Document} from './Document';
import {DocumentBaseOptions} from './DocumentBaseOptions';

export type DocumentOptions = DocumentBaseOptions & {
  description: string;
  createdAt: string;
  comments: CommentOptions[];
  parent: Document;
};
