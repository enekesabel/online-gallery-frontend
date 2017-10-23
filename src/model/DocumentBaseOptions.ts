import {UserOptions} from './UserOptions';
import {DocumentType} from './DocumentType';

export type DocumentBaseOptions = {
  id: number;
  type: DocumentType;
  name: string;
  url: string;
  owner: UserOptions;
  parent: DocumentBaseOptions;
};
