import {Group} from '../../model/Group';
import {GroupApi} from '../../api/GroupApi';
import MessageBus from '../../components/message_bus/MessageBus.vue';

const api = new GroupApi();

enum MutationType {
  SET_OWNED_GROUPS = 'SET_OWNED_GROUPS',
  SET_MEMBER_OF_GROUPS = 'SET_MEMBER_OF_GROUPS',
  SET_GROUP = 'SET_GROUP',
  DELETE_GROUP = 'DELETE_GROUP',
  LEAVE_GROUP = 'LEAVE_GROUP',
}

class State {
  ownedGroups: Group[] = [];
  memberOfGroups: Group[] = [];
}

const getters = {
  getOwnedGroups(state: State): Group[] {
    return state.ownedGroups;
  },
  getMemberOfGroups(state: State): Group[] {
    return state.memberOfGroups;
  },
  getGroup(state: State, groupId): Group {
    return state.ownedGroups.find(g => {
      return g.id === groupId;
    }) || state.memberOfGroups.find(g => {
      return g.id === groupId;
    });
  },
};

const actions = {
  async fetchGroups({commit}) {
    try {
      const groups = await api.getAll();
      const ownedGroups = [];
      groups.data.ownedGroups.forEach(g => {
        ownedGroups.push(new Group(g));
      });
      const memberOfGroups = [];
      groups.data.memberOfGroups.forEach(g => {
        memberOfGroups.push(new Group(g));
      });
      commit(MutationType.SET_OWNED_GROUPS, ownedGroups);
      commit(MutationType.SET_MEMBER_OF_GROUPS, memberOfGroups);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when retrieving groups.');
    }
  },
  async createGroup({commit}, group: Group) {
    try {
      const reponse = await  api.create(group);
      commit(MutationType.SET_GROUP, new Group(reponse.data));
    } catch (err) {
      MessageBus.showError('Error occurred when creating group.');
    }
  },
  async updateGroup({commit, state}, group: Group) {
    try {
      const oldGroup = getters.getGroup(state, group.id);
      const oldUserIds = oldGroup.userIds;
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
      let updatedGroupResponse;
      if (userIdsToAdd.length > 0) {
        updatedGroupResponse = await api.addUsersToGroup(userIdsToAdd, group.id);
      }
      if (userIdsToRemove.length > 0) {
        updatedGroupResponse = await api.removeUsersFromGroup(userIdsToRemove, group.id);
      }
      if (group.name !== oldGroup.name) {
        updatedGroupResponse = await api.renameGroup(group.id, group.name);
      }

      if (updatedGroupResponse) {
        commit(MutationType.SET_GROUP, new Group(updatedGroupResponse.data));
      }

    } catch (err) {
      MessageBus.showError('Error occurred when updating group.');
    }
  },
  async deleteGroup({commit}, groupId) {
    try {
      await api.delete(groupId);
      commit(MutationType.DELETE_GROUP, groupId);
      MessageBus.showSuccess('Delete completed');
    } catch (err) {
      MessageBus.showError('Error occurred when deleting group.');
    }
  },
  async quitFromGroup({commit}, groupId) {
    try {
      await api.quitFromGroup(groupId);
      commit(MutationType.LEAVE_GROUP, groupId);
    } catch (err) {
      MessageBus.showError('Error occurred when leaving group.');
    }
  },
};

const mutations = {
  [MutationType.SET_OWNED_GROUPS](state: State, groups: Group[]) {
    state.ownedGroups = groups;
  },
  [MutationType.SET_MEMBER_OF_GROUPS](state: State, groups: Group[]) {
    state.memberOfGroups = groups;
  },
  [MutationType.SET_GROUP](state: State, group: Group) {
    const groupIndex = state.ownedGroups.findIndex(g => {
      return g.id === group.id;
    });
    if (groupIndex !== -1) {
      const groups = state.ownedGroups.slice();
      groups[groupIndex] = group;
      state.ownedGroups = groups;
    } else {
      state.ownedGroups.push(group);
    }
  },
  [MutationType.DELETE_GROUP](state: State, groupId: string) {
    const groupIndex = state.ownedGroups.findIndex(g => {
      return g.id === groupId;
    });
    if (groupIndex !== -1) {
      state.ownedGroups.splice(groupIndex, 1);
    }
  },
  [MutationType.LEAVE_GROUP](state: State, groupId: string) {
    const groupIndex = state.memberOfGroups.findIndex(g => {
      return g.id === groupId;
    });
    if (groupIndex !== -1) {
      state.memberOfGroups.splice(groupIndex, 1);
    }
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
