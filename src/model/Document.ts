import {User} from './User';

export abstract class Document {
  private _id: number;
  private _name: string;
  private _description: string;
  private _url: string;
  private _createdAt: string;
  private _owner: User;
  private _comments: Comment[] = [];
  private _parent: Document = null;

  abstract get children(): Document[];
  abstract get type(): string;

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get owner(): User {
    return this._owner;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  get parent(): Document {
    return this._parent;
  }

  set parent(value: Document) {
    this._parent = value;
  }

}
