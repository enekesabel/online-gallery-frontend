import Vue from 'vue';
import Vuex from 'vuex';
import DocumentStore from './modules/DocumentStore';
import UserStore from './modules/UserStore';
import GroupStore from './modules/GroupStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    documentStore: DocumentStore,
    userStore: UserStore,
    groupStore: GroupStore,
  },
});

