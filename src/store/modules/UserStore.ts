import Vue from 'vue';
import {User} from "../../model/User";

enum MutationType {
  SET_DOCUMENT = 'SET_DOCUMENT',
  ADD_CHILD = 'ADD_CHILD',
  SET_CHILD = 'SET_CHILD',
  REMOVE_CHILD = 'REMOVE_CHILD',
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
  async fetchUsers({commit}, {documentId}) {
    const api = new DocumentApi();
    const document = await api.get(documentId);
    commit(MutationType.SET_DOCUMENT, document);
  },
};

const mutations = {
  [MutationType.SET_DOCUMENT](state: State, document: Document) {
    state.document = document;
  },
  [MutationType.ADD_CHILD](state: State, documentChild: DocumentBase) {
    if (state.document.type === DocumentType.ALBUM) {
      (<Album>state.document).children.push(documentChild);
    }
  },
  [MutationType.REMOVE_CHILD](state: State, childId) {
    if (state.document.type === DocumentType.ALBUM) {
      const album = (<Album>state.document);
      const index = album.children.findIndex(c => {
        return c.id === childId;
      });
      album.children.splice(index, 1);
    }
  },
  [MutationType.SET_CHILD](state: State, child: DocumentBase) {
    if (state.document.type === DocumentType.ALBUM) {
      const album = (<Album>state.document);
      const index = album.children.findIndex(c => {
        return c.id === child.id;
      });
      album.children[index] = child;
    }
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
