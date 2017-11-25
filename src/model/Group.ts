import {GroupOptions} from './GroupOptions';
import {Serializable} from './Serializable';

export class Group implements GroupOptions, Serializable {
  private _name: string;
  private _id: string;
  private _userIds: string[] = [];
  private _ownerUserId: string;

  constructor(options?: GroupOptions) {
    this._name = options && options.name || '';
    this._id = options && options.id || '';
    this._ownerUserId = options && options.ownerUserId || '';
    this._userIds = options && options.userIds || [];
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  get userIds(): string[] {
    return this._userIds;
  }

  get ownerUserId(): string {
    return this._ownerUserId;
  }

  toObject(): GroupOptions {
    return {
      id: this.id,
      name: this.name,
      userIds: this.userIds,
      ownerUserId: this.ownerUserId
    };
  }
}
