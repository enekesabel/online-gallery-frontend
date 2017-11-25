import {UserOptions} from './UserOptions';
import {Serializable} from './Serializable';

export class User implements UserOptions, Serializable {
  private _id: string;
  private _name: string;
  private _emailAddress: string;

  constructor(options: UserOptions) {
    this._id = options.id;
    this._name = options.name;
    this._emailAddress = options.emailAddress;
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
    };
  }
}
