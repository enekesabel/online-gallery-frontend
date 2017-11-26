import {AbstractApi} from './AbstractApi';
import {Group} from '../model/Group';
import Vue from 'vue';

export class GroupApi extends AbstractApi<Group> {

  constructor() {
    super('/usergroups');
  }

  async update(id: string, group: Group): Promise<any> {
    /*
    const oldResponse = await this.get(id);
    const oldUserIds = oldResponse.data.userIds;

    const userIdsToAdd = [];
    group.userIds.forEach(id => {
      if (oldUserIds.indexOf(id) === -1) {
        userIdsToAdd.push(id);
      }
    });

    const userIdsToRemove = [];
    oldUserIds.forEach(id => {
      if (group.userIds.indexOf(id) === -1) {
        userIdsToRemove.push(id);
      }
    });

    await this.addUsersToGroup(userIdsToAdd, id);
    await this.removeUsersFromGroup(userIdsToAdd, id);
    */

    throw new Error('Not implemented');
  }

  async addUsersToGroup(userIds: string[], groupId: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/adduser', {
      userIds,
      groupId,
    });
  }

  async removeUsersFromGroup(userIds: string[], groupId: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/removeuser', {
      userIds,
      groupId,
    });
  }

  async renameGroup(groupId: string, newName: string) {
    return await Vue.axios.patch(this.url + '/renamegroup', {
      groupId,
      newName,
    });
  }

}
