import {User} from '../../model/User';
import {UserApi} from '../../api/UserApi';

const api = new UserApi();

enum MutationType {
  SET_USERS = 'SET_USERS',
}

class State {
  users: User[] = [];
}

const getters = {
  getUsers(state: State): User[] {
    return state.users;
  },
};

const actions = {
  async fetchUsers({commit}) {
    const users = await api.getAll();
    commit(MutationType.SET_USERS, users);
  },
  async register({commit}, {user}) {
  },
};

const mutations = {
  [MutationType.SET_USERS](state: State, users: User[]) {
    state.users = users;
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};