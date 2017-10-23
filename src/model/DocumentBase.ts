import {DocumentBaseOptions} from './DocumentBaseOptions';
import {User} from './User';
import {DocumentType} from './DocumentType';

export class DocumentBase implements DocumentBaseOptions {
  private _id: number;
  private _name: string;
  private _url: string;
  private _owner: User;
  protected _type: DocumentType;
  protected _parent: DocumentBase;

  constructor(options: DocumentBaseOptions) {
    this._id = options.id;
    this._name = options.name;
    this._url = options.url;
    if (options.owner instanceof User) {
      this._owner = options.owner;
    } else {
      this._owner = new User(options.owner);
    }
    this._type = options.type;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get url(): string {
    return this._url;
  }

  get owner(): User {
    return this._owner;
  }

  get type(): DocumentType {
    return this._type;
  }

  get parent(): DocumentBase {
    return this._parent;
  }

}
