import {GroupOptions} from './GroupOptions';
import {User} from './User';

export class Group implements GroupOptions {
  private _name: string;
  private _id: string | number;
  private _users: User[] = [];

  constructor(options?: GroupOptions)  {
    this._name = options && options.name || '';
    this._id = options && options.id || '';
    if (options && options.users) {
      options.users.forEach(userOption => {
        this.users.push(new User(userOption));
      });
    } else {
      this._users = [];
    }
  }

  get name(): string {
    return this._name;
  }

  get id(): string | number {
    return this._id;
  }

  get users(): User[] {
    return this._users;
  }
}
