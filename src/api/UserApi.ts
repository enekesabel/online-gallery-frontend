import {AbstractApi} from './AbstractApi';
import {User} from '../model/User';

export class UserApi extends AbstractApi<User> {

  constructor() {
    super('/users');
  }

}
