import {Group} from '../../model/Group';
import {GroupApi} from '../../api/GroupApi';
import MessageBus from '../../components/message_bus/MessageBus.vue';

const api = new GroupApi();

enum MutationType {
  SET_OWNED_GROUPS = 'SET_OWNED_GROUPS',
  SET_MEMBER_OF_GROUPS = 'SET_MEMBER_OF_GROUPS',
  SET_GROUP = 'SET_GROUP',
  DELETE_GROUP = 'DELETE_GROUP',
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
    const reponse = await  api.create(group);
    commit(MutationType.SET_GROUP, new Group(reponse.data));
  },
  async updateGroup({commit}, group: Group) {
    const updatedGroup = await  api.update(group.id, group);
    commit(MutationType.SET_GROUP, updatedGroup);
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
      state.ownedGroups[groupIndex] = group;
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
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
