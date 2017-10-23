import {DocumentOptions} from './DocumentOptions';
import {DocumentBaseOptions} from './DocumentBaseOptions';

export type AlbumOptions = DocumentOptions & {
  children: DocumentBaseOptions[],
};
