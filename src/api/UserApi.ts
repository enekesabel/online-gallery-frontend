import {AbstractApi} from './AbstractApi';
import {User} from '../model/User';
import {UserOptions} from '../model/UserOptions';

export class UserApi extends AbstractApi<User> {

  static count: number = 0;

  constructor() {
    super('/users');
  }

  createEntity(o: UserOptions): User {

    return new User(this.getDummyUserOptions());
  }

  getDummyUserOptions(): UserOptions {
    const owner = {
      id: UserApi.count,
      name: 'User ' + UserApi.count,
      email: 'asd@email.com',
    };
    UserApi.count++;
    return owner;
  }


}
