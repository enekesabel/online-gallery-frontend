import {GroupOptions} from './GroupOptions';
import {User} from './User';
import {Serializable} from "./Serializable";
import {UserOptions} from "./UserOptions";

export class Group implements GroupOptions, Serializable {
  private _name: string;
  private _id: string | number;
  private _users: User[] = [];

  constructor(options?: GroupOptions) {
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

  toObject(): GroupOptions {
    const users: UserOptions[] = [];
    this.users.forEach(user => {
      users.push(user.toObject());
    });
    return {
      id: this.id,
      name: this.name,
      users,
    };
  }
}
