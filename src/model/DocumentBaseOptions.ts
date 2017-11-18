import {UserOptions} from './UserOptions';
import {DocumentType} from './DocumentType';
import {HasId} from "./HasId";
import {CommentOptions} from "./CommentOptions";

export type DocumentBaseOptions = HasId & {
  id: number;
  type: DocumentType;
  name: string;
  url: string;
  owner: UserOptions;
  parent: DocumentBaseOptions;
  comments: any[];
  children?: any[];
};
