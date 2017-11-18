import Vue from 'vue';
import Vuex from 'vuex';
import document from './modules/Documents';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    document,
  },
});

