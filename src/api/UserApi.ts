import {AbstractApi} from './AbstractApi';
import {User} from '../model/User';
import {UserOptions} from '../model/UserOptions';

export class UserApi extends AbstractApi<User> {

  constructor() {
    super('/users');
  }

  createEntity(o: UserOptions): User {

    return new User(this.getDummyUserOptions());
  }

  getDummyUserOptions(): UserOptions {
    const owner = {
      id: 1,
      name: 'Me',
      email: 'asd@email.com',
    };
    return owner;
  }


}
