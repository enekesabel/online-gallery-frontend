import {User} from './User';

export class Comment {
  private _id: number;
  private _user: User;
  private _content: string;
  private _createdAt: string;

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
