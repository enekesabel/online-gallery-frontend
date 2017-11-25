import {User} from '../../model/User';
import {UserApi} from '../../api/UserApi';
import MessageBus from '../../components/message_bus/MessageBus.vue';

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
    try {
      const users = await api.getAll();
      commit(MutationType.SET_USERS, users);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when retrieving users.');
    }
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
