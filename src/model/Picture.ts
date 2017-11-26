import {PictureOptions} from './PictureOptions';
import {PictureBase} from './PictureBase';
import {Comment} from './Comment';

export class Picture extends PictureBase implements PictureOptions {
  private _size: number;
  private _width: number;
  private _height: number;
  private _comments: Comment[] = [];
  private _description: string;
  private _createdAt: string;
  private _metaData: {
    height: number,
    width: number,
    size: number,
  } = {
    height: 0,
    width: 0,
    size: 0,
  };

  constructor(options: PictureOptions) {
    super(options);
    this._size = options.size;
    this._width = options.width;
    this._height = options.height;
    this._description = options.description;
    this._createdAt = options.createdAt;
    this._metaData = options.metaData;
    options.comments.forEach(c => {
      this._comments.push(new Comment(c));
    });
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

  get comments(): Comment[] {
    return this._comments;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get metaData(): { height: number; width: number; size: number } {
    return this._metaData;
  }
}
