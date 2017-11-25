import {DocumentBaseOptions} from './DocumentBaseOptions';

export type PictureBaseOptions = DocumentBaseOptions & {
  commentsNumber: number;
  url: string;
};
