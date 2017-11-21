import {AbstractApi} from './AbstractApi';
import {User} from '../model/User';
import {UserOptions} from '../model/UserOptions';
import Vue from 'vue';

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

  async create(u: User) {
    return new Promise((resolve, reject) => {
      Vue.axios.post(this.url + '/register', u).then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
    });

  }

}
