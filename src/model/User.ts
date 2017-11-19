import {UserOptions} from './UserOptions';

export class User implements UserOptions{
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
}
