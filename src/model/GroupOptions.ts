import {HasId} from './HasId';

export type GroupOptions = HasId & {
  name: string,
  ownerUserId: string,
  userIds: string[],
};

