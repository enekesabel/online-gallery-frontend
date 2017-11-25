import {DocumentApi} from '../../api/DocumentApi';
import {DocumentBase} from '../../model/DocumentBase';
import {Album} from '../../model/Album';
import {DocumentType} from '../../model/DocumentType';
import {ShareType} from '../../model/ShareType';
import {AlbumBase} from '../../model/AlbumBase';
import {PictureBase} from '../../model/PictureBase';
import {DocumentBaseFactory} from '../../model/DocumentBaseFactory';

const factory: DocumentBaseFactory = new DocumentBaseFactory();

enum MutationType {
  SET_ALBUM = 'SET_ALBUM',
  ADD_CHILD = 'ADD_CHILD',
  SET_CHILD = 'SET_CHILD',
  REMOVE_CHILD = 'REMOVE_CHILD',
}

class State {
  album: Album = new Album({
    type: DocumentType.ALBUM,
    name: '',
    displayName: '',
    id: '0',
    ownerUserId: '1',
    shareType: ShareType.PUBLIC,
    parentAlbumId: null,
    childAlbums: [],
    pictures: [],
    childNumber: 0,
  });
}

const getters = {
  getAlbum(state: State): Album {
    return state.album;
  },

  getChildAlbums(state: State): AlbumBase[] {
    return state.album.childAlbums;
  },

  getPictures(state: State): PictureBase[] {
    return state.album.pictures;
  },
};

const actions = {
  async fetchDocument({commit}, {documentId}) {
    const api = new DocumentApi();
    const document = await api.get(documentId);
    commit(MutationType.SET_ALBUM, document);
  },
};

const mutations = {
  [MutationType.SET_ALBUM](state: State, album: Album) {
    state.album = album;
  },
  [MutationType.ADD_CHILD](state: State, documentChild: DocumentBase) {
    if (documentChild.type === DocumentType.ALBUM) {
      state.album.childAlbums.push(<AlbumBase>factory.getDocument(documentChild));
    } else {
      state.album.pictures.push(<PictureBase>factory.getDocument(documentChild));
    }
  },
  [MutationType.REMOVE_CHILD](state: State, childId) {
    let index = state.album.childAlbums.findIndex(c => {
      return c.id === childId;
    });
    if (index !== -1) {
      state.album.childAlbums.splice(index, 1);
    } else {
      index = state.album.pictures.findIndex(c => {
        return c.id === childId;
      });
      if (index !== -1) {
        state.album.pictures.splice(index, 1);
      }
    }
  },
  [MutationType.SET_CHILD](state: State, child: DocumentBase) {
    let index = state.album.childAlbums.findIndex(c => {
      return c.id === child.id;
    });
    if (index !== -1) {
      state.album.childAlbums[index] = <AlbumBase>factory.getDocument(child);

    } else {
      index = state.album.pictures.findIndex(c => {
        return c.id === child.id;
      });
      if (index !== -1) {
        state.album.pictures[index] = <PictureBase>factory.getDocument(child);
      }
    }
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
