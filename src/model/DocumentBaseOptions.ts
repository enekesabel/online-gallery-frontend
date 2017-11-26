import {DocumentType} from './DocumentType';
import {HasId} from './HasId';

export type DocumentBaseOptions = HasId & {
  type: DocumentType;
  name: string;
  displayName: string;
  ownerUserId: string;
  parentAlbumId: string;
};
