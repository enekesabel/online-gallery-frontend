import {DocumentOptions} from './DocumentOptions';
import {HasId} from "./HasId";

export type ImageOptions = HasId & DocumentOptions & {
  size: number;
  width: number;
  height: number;
  file;
};
