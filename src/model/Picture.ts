import {PictureOptions} from './PictureOptions';
import {PictureBase} from './PictureBase';
import {Comment} from './Comment';
import {Serializable} from './Serializable';

export class Picture extends PictureBase implements PictureOptions, Serializable {
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
    this._description = options.description;
    this._createdAt = options.createdAt;
    this._metaData = options.metaData;
    options.comments && options.comments.forEach(c => {
      this._comments.push(new Comment(c));
    });
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

  toObject(): PictureOptions {
    const serializedComments = [];
    this.comments.forEach(c => {
      serializedComments.push(c.toObject());
    });

    return Object.assign(super.toObject(), {
      description: this.description,
      comments: serializedComments,
      createdAt: this.createdAt,
      metaData: this.metaData,
    });
  }
}
