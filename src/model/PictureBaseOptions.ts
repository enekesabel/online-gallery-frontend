import {DocumentBaseOptions} from './DocumentBaseOptions';

export type PictureBaseOptions = DocumentBaseOptions & {
  commentsNumber: number;
  thumbnailName: string;
};
