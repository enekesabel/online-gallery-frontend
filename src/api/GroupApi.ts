import {AbstractApi} from './AbstractApi';
import {Group} from '../model/Group';
import {GroupOptions} from '../model/GroupOptions';

export class GroupApi extends AbstractApi<Group> {

  constructor() {
    super('/groups');
  }

  createEntity(o: GroupOptions): Group {

    return new Group(this.getDummyGroupOptions());
  }

  getDummyGroupOptions(): GroupOptions {
    const group = {
      id: 1,
      name: 'My group',
      users: [
        {
          id: 1,
          name: 'Me',
          email: 'asd@email.com',
        },
        {
          id: 2,
          name: 'You',
          email: 'asd@email.com',
        },
      ],
    };
    return group;
  }


}
