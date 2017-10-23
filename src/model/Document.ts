import {User} from './User';
import {Comment} from './Comment';
import {DocumentOptions} from './DocumentOptions';
import {DocumentType} from './DocumentType';

export abstract class Document implements DocumentOptions {
  private _id: number;
  private _name: string;
  private _description: string;
  private _url: string;
  private _createdAt: string;
  private _owner: User;
  private _comments: Comment[] = [];
  private _parent: Document = null;

  constructor(options: DocumentOptions) {
    this._id = options.id;
    this._name = options.name;
    this._description = options.description;
    this._url = options.url;
    this._createdAt = options.createdAt;
    if (options.owner instanceof User) {
      this._owner = options.owner;
    } else {
      this._owner = new User(options.owner);
    }
    options.comments.forEach(comment => {
      this.comments.push(new Comment(comment));
    });
    this._parent = options.parent;
  }

  abstract get children(): Document[];

  abstract get type(): DocumentType;

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
