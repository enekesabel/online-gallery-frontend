import {AlbumApi} from '../../api/AlbumApi';
import {DocumentBase} from '../../model/DocumentBase';
import {Album} from '../../model/Album';
import {DocumentType} from '../../model/DocumentType';
import {ShareType} from '../../model/ShareType';
import {AlbumBase} from '../../model/AlbumBase';
import {Comment} from '../../model/Comment';
import {PictureBase} from '../../model/PictureBase';
import {DocumentBaseFactory} from '../../model/DocumentBaseFactory';
import MessageBus from '../../components/message_bus/MessageBus.vue';
import {CommentApi} from '../../api/CommentApi';
import {Picture} from '../../model/Picture';
import {PictureOptions} from '../../model/PictureOptions';
import Vue from 'vue';
import {PictureApi} from '../../api/PictureApi';

const factory: DocumentBaseFactory = new DocumentBaseFactory();
const albumApi = new AlbumApi();
const pictureApi = new PictureApi();
const commentApi = new CommentApi();

enum MutationType {
  SET_ALBUM = 'SET_ALBUM',
  ADD_CHILD = 'ADD_CHILD',
  SET_CHILD = 'SET_CHILD',
  REMOVE_CHILD = 'REMOVE_CHILD',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  SET_COMMENTS = 'SET_COMMENTS',
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
    childCount: 0,
    albumTree: [],
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
  async fetchDocument({commit}, documentId: string) {
    try {
      const response = await albumApi.get(documentId);
      commit(MutationType.SET_ALBUM, new Album(Object.assign(response.data, response.data.album)));
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when fetching document.');
    }
  },
  async deleteDocument({commit}, documentId: string) {
    try {
      await albumApi.delete(documentId);
      MessageBus.showSuccess('Delete completed');
      commit(MutationType.REMOVE_CHILD, documentId);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when deleting document.');
    }
  },
  async createAlbum({commit}, album: AlbumBase) {
    try {
      const response = await albumApi.create(album);
      commit(MutationType.ADD_CHILD, new AlbumBase(response.data));
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when creating album.');
    }
  },
  async renameAlbum({commit}, {albumId, newName, newDisplayName}) {
    try {
      const response = await albumApi.renameAlbum(albumId, newName, newDisplayName);
      commit(MutationType.SET_CHILD, new AlbumBase(response.data));
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when renaming album.');
    }
  },
  async getCommentForPicture({commit}, picture: PictureBase) {
    try {
      const response = await commentApi.get(picture.id);
      const comments = [];
      if (response.data.length > 0) {
        response.data.forEach(c => {
          comments.push(new Comment(c));
        });

        commit(MutationType.SET_COMMENTS, comments);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async commentPicture({commit}, comment: Comment) {
    try {
      const response = await commentApi.create(comment);
      commit(MutationType.ADD_COMMENT, new Comment(response.data));
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when commenting picture');
    }
  },
  async deleteComment({commit}, comment: Comment) {
    try {
      await commentApi.delete(comment.id);
      commit(MutationType.DELETE_COMMENT, comment);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when deleting comment.');
    }
  },
  async downloadAlbum({commit}, album: Album) {
    try {
      const albumDownloadApi = new AlbumApi('/albumdownload');
      const response = await albumDownloadApi.get(album.id || '');
      const a = document.createElement('a');
      a.style = 'display: none';
      a.href = Vue.prototype.staticUrl + '/' + response.data;
      a.download = response.data;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when downloading album.');
    }
  },
  async moveAlbum({commit}, album: Album, newParentId: string) {
    try {
      await albumApi.moveAlbum(album.id, newParentId);
      commit(MutationType.REMOVE_CHILD, album.id);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when moving album.');
    }
  },
  async updatePicture({commit}, picture: PictureBase) {
    try {
      const response = await pictureApi.update(picture.id, picture);
      commit(MutationType.SET_CHILD, new Picture(response.data));
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when updating picture.');
    }
  },
  async movePicture({commit}, picture: Picture, newParentId: string) {
    try {
      await pictureApi.movePicture(picture.id, newParentId);
      commit(MutationType.REMOVE_CHILD, picture.id);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when moving picture.');
    }
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
      state.album.pictures.push(<Picture>factory.getDocument(documentChild));
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
      state.album.childAlbums.splice(index, 1, <AlbumBase>factory.getDocument(child));
    } else {
      index = state.album.pictures.findIndex(c => {
        return c.id === child.id;
      });
      if (index !== -1) {
        state.album.pictures.splice(index, 1, <Picture>factory.getDocument(child));
      }
    }
  },
  [MutationType.SET_COMMENTS](state: State, comments: Comment[]) {
    const pictureIndex = state.album.pictures.findIndex(p => {
      return p.id === comments[0].pictureId;
    });
    if (pictureIndex !== -1) {
      const oldPicture = state.album.pictures[pictureIndex];
      const newPictureOptions: PictureOptions = oldPicture.toObject();
      newPictureOptions.comments = comments;

      state.album.pictures.splice(pictureIndex, 1, new Picture(newPictureOptions));
    }
  },
  [MutationType.ADD_COMMENT](state: State, comment: Comment) {
    const picture = state.album.pictures.find(p => {
      return p.id === comment.pictureId;
    });

    picture.comments.push(comment);
  },
  [MutationType.DELETE_COMMENT](state: State, comment: Comment) {
    const picture = state.album.pictures.find(p => {
      return p.id === comment.pictureId;
    });
    const commentIndex = picture.comments.findIndex(c => {
      return c.id === comment.id;
    });

    if (commentIndex !== -1) {
      picture.comments.splice(commentIndex, 1);
    }
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
