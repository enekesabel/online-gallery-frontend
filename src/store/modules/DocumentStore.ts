import Vue from 'vue';
import {DocumentApi} from '../../api/DocumentApi';
import {Document} from '../../model/Document';
import {DocumentFactory} from '../../model/DocumentFactory';
import {DocumentBase} from '../../model/DocumentBase';
import {Album} from '../../model/Album';
import {DocumentType} from '../../model/DocumentType';
import {GetterTree} from 'vuex';

const factory = new DocumentFactory();

enum MutationType {
  SET_DOCUMENT = 'SET_DOCUMENT',
  ADD_CHILD = 'ADD_CHILD',
  SET_CHILD = 'SET_CHILD',
  REMOVE_CHILD = 'REMOVE_CHILD',
}

class State {
  document: Document;
}

const getters = {
  getDocument(state: State):Document {
    return factory.getDocument(state.document);
  },

  getChildren(state: State): DocumentBase[] {
    const children = [];
    if (state.document && state.document.type === DocumentType.ALBUM) {
      (<Album>state.document).children.forEach(child => {
        children.push(new DocumentBase(child));
      });
    }
    return children;
  },
};

const actions = {
  async fetchDocument({commit}, {documentId}) {
    const api = new DocumentApi();
    const document = await api.get(documentId);

    console.log('fetchedDocument', document);
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
