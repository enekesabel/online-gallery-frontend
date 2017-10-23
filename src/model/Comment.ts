import {User} from './User';
import {CommentOptions} from './CommentOptions';

export class Comment implements CommentOptions {
  private _id: number;
  private _user: User;
  private _content: string;
  private _createdAt: string;

  constructor(options: CommentOptions) {
    this._id = options.id;
    if (options.user instanceof User) {
      this._user = options.user;
    } else {
      this._user = new User(options.user);
    }
    this._content = options.content;
    this._createdAt = options.createdAt;
  }

  get id(): number {
    return this._id;
  }

  get user(): User {
    return this._user;
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
