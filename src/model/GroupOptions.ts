import {UserOptions} from './UserOptions';

export type GroupOptions = {
  name: string,
  id: string | number,
  users: UserOptions[],
};

