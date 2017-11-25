import {CommentOptions} from './CommentOptions';

export class Comment implements CommentOptions {
  private _id: string;
  private _userId: string;
  private _content: string;
  private _createdAt: string;
  private _pictureId: string;

  constructor(options: CommentOptions) {
    this._id = options.id;
    this._userId = options.userId;
    this._content = options.content;
    this._createdAt = options.createdAt;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get pictureId(): string {
    return this._pictureId;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }
}
