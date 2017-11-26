import {PictureBaseOptions} from './PictureBaseOptions';
import {CommentOptions} from './CommentOptions';

export type PictureOptions = PictureBaseOptions & {
  comments: CommentOptions[];
  size: number;
  width: number;
  height: number;
  description: string;
  createdAt: string;
  metaData: {
    height: number,
    width: number,
    size: number,
  }
};
