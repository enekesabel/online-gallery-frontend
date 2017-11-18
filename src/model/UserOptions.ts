import {HasId} from "./HasId";

export type UserOptions = HasId & {
  name: string;
  email: string;
};
