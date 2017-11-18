import Vue from 'vue';
import Vuex from 'vuex';
import DocumentStore from './modules/DocumentStore';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    documentStore: DocumentStore,
  },
});

