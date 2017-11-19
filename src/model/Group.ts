import {GroupOptions} from './GroupOptions';
import {User} from './User';

export class Group implements GroupOptions {
  private _name: string;
  private _id: string | number;
  private _users: User[] = [];

  constructor(options: GroupOptions) {
    this._name = options.name;
    this._id = options.id;
    options.users.forEach(userOption => {
      this.users.push(new User(userOption));
    });
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
