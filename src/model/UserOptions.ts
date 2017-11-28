import {HasId} from './HasId';

export type UserOptions = HasId & {
  name: string;
  emailAddress: string;
  password?: string;
};
