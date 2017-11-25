import {UserOptions} from './UserOptions';
import {HasId} from './HasId';

export type GroupOptions = HasId & {
  name: string,
  users: UserOptions[],
};

