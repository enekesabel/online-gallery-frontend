import {UserOptions} from './UserOptions';
import {Serializable} from "./Serializable";

export class User implements UserOptions, Serializable {
  private _id: string;
  private _name: string;
  private _email: string;

  constructor(options: UserOptions) {
    this._id = options.id;
    this._name = options.name;
    this._email = options.email;
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

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  toObject(): UserOptions {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
