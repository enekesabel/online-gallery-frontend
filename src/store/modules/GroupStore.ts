import {Group} from '../../model/Group';
import {GroupApi} from '../../api/GroupApi';

const api = new GroupApi();

enum MutationType {
  SET_GROUPS = 'SET_GROUPS',
  SET_GROUP = 'SET_GROUP',
  DELETE_GROUP = 'DELETE_GROUP',
}

class State {
  groups: Group[] = [];
}

const getters = {
  getGroups(state: State): Group[] {
    return state.groups;
  },
  getGroup(state: State, groupId): Group {
    return state.groups.find(g => {
      return g.id === groupId;
    });
  },
};

const actions = {
  async fetchGroups({commit}) {
    const groups = await api.getAll();
    commit(MutationType.SET_GROUPS, groups);
  },
  async createGroup({commit}, {group}) {
    const newGroup = await  api.create(group);
    commit(MutationType.SET_GROUP, newGroup);
  },
  async updateGroup({commit}, {group}) {
    const updatedGroup = await  api.update(group.id, group);
    commit(MutationType.SET_GROUP, updatedGroup);
  },
  async deleteGroup({commit}, {groupId}) {
    try {
      await api.delete(groupId);
      commit(MutationType.DELETE_GROUP, groupId);
    } catch (e) {

    }
  },
};

const mutations = {
  [MutationType.SET_GROUPS](state: State, groups: Group[]) {
    state.groups = groups;
  },
  [MutationType.SET_GROUP](state: State, group: Group) {
    const groupIndex = state.groups.findIndex(g => {
      return g.id === group.id;
    });
    if (groupIndex !== -1) {
      state.groups[groupIndex] = group;
    } else {
      state.groups.push(group);
    }
  },
  [MutationType.DELETE_GROUP](state: State, groupId: string) {
    const groupIndex = state.groups.findIndex(g => {
      return g.id === groupId;
    });
    if (groupIndex !== -1) {
      state.groups.splice(groupIndex, 1);
    }
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
