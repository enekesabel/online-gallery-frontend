import {AbstractApi} from './AbstractApi';
import {User} from '../model/User';
import Vue from 'vue';

export class UserApi extends AbstractApi<User> {

  constructor() {
    super('/users');
  }

}
