import {DocumentBaseOptions} from './DocumentBaseOptions';
import {ShareType} from './ShareType';

export type AlbumBaseOptions = DocumentBaseOptions & {
  shareType: ShareType;
  childCount: number;
};
