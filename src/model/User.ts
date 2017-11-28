import {UserOptions} from './UserOptions';
import {Serializable} from './Serializable';

export class User implements UserOptions, Serializable {
  private _id: string = null;
  private _name: string = '';
  private _emailAddress: string = '';
  private password: string = '';

  constructor(options?: UserOptions) {
    this._id = options && options.id;
    this._name = options && options.name;
    this._emailAddress = options && options.emailAddress;
    this.password = options && options.password || '';
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  toObject(): UserOptions {
    return {
      id: this.id,
      name: this.name,
      emailAddress: this.emailAddress,
      password: this.password,
    };
  }
}
