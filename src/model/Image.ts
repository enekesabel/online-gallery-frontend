import {Document} from './Document';

export class Image extends Document {
  private _type: 'image';
  private _size: number;
  private _width: number;
  private _height: number;
  private _file;

  get size(): number {
    return this._size;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get file() {
    return this._file;
  }

  get children(): Document[] {
    return null;
  }
  get type() {
    return this._type;
  }
}
