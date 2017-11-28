import {User} from '../../model/User';
import {UserApi} from '../../api/UserApi';
import MessageBus from '../../components/message_bus/MessageBus.vue';
import Vue from 'vue';

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
      commit(MutationType.SET_USERS, users.data);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when retrieving users.');
    }
  },
  async updateUser({commit}, user: User) {
    try {
      const response = await api.update(user.id, user);
      MessageBus.showSuccess('Successfully updated!.');
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when updating users.');
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
