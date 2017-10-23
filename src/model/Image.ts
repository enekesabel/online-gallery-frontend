import {Document} from './Document';
import {ImageOptions} from './ImageOptions';
import {DocumentType} from './DocumentType';

export class Image extends Document implements ImageOptions {
  private _type: DocumentType = DocumentType.IMAGE;
  private _size: number;
  private _width: number;
  private _height: number;
  private _file;

  constructor(options: ImageOptions) {
    super(options);
    this._size = options.size;
    this._width = options.width;
    this._height = options.height;
    this._file = options.file;
  }

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

  get type(): DocumentType {
    return this._type;
  }
}
