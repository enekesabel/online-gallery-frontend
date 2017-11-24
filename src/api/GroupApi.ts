import {AbstractApi} from './AbstractApi';
import {Group} from '../model/Group';
export class GroupApi extends AbstractApi<Group> {

  constructor() {
    super('/usergroups');
  }

  getAll(): Promise<any> {
    return super.getAll();
  }

}
