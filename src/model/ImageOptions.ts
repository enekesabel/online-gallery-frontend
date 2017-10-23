import {DocumentOptions} from './DocumentOptions';

export type ImageOptions = DocumentOptions & {
  size: number;
  width: number;
  height: number;
  file;
};
