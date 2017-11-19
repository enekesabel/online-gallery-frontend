import {Group} from '../../model/Group';
import {GroupApi} from '../../api/GroupApi';

enum MutationType {
  SET_GROUPS = 'SET_GROUPS',
}

class State {
  groups: Group[] = [];
}

const getters = {
  getGroups(state: State): Group[] {
    return state.groups;
  },
};

const actions = {
  async fetchGroups({commit}) {
    const api = new GroupApi();
    const groups = await api.getAll();
    commit(MutationType.SET_GROUPS, groups);
  },
};

const mutations = {
  [MutationType.SET_GROUPS](state: State, groups: Group[]) {
    state.groups = groups;
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
