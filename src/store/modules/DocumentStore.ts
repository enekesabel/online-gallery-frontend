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
import {AlbumHierarchy} from '../../model/AlbumHierarchy';
import {ShareApi} from '../../api/ShareApi';
import {Share} from '../../model/Share';
import {DocumentShareType} from '../../model/ShareOptions';

const factory: DocumentBaseFactory = new DocumentBaseFactory();
const albumApi = new AlbumApi();
const pictureApi = new PictureApi();
const commentApi = new CommentApi();
const shareApi = new ShareApi();

enum MutationType {
  SET_ALBUM = 'SET_ALBUM',
  ADD_CHILD = 'ADD_CHILD',
  SET_CHILD = 'SET_CHILD',
  REMOVE_CHILD = 'REMOVE_CHILD',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  SET_COMMENTS = 'SET_COMMENTS',
  SET_ALBUM_HIERARCHY = 'SET_ALBUM_HIERARCHY',
  MOVE_DOCUMENT = 'MOVE_DOCUMENT',
  SET_SHARES = 'SET_SHARES',
  SET_SHARED_WITH_ME = 'SET_SHARED_WITH_ME',
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
  albumHierarchy: AlbumHierarchy = {
    id: null,
    displayName: 'gallery',
    childAlbums: [],
  };
  shares: Share[] = [];
  sharedWidthMe: Picture[][] = [];
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
  getAlbumHierarchy(state: State): AlbumHierarchy {
    return state.albumHierarchy;
  },
  getShares(state: State): Share[] {
    return state.shares;
  },
  getSharedWithMe(state: State): Picture[][] {
    return state.sharedWidthMe;
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
  async deleteAlbum({commit}, documentId: string) {
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
  async moveAlbum({commit}, {album, newParentId}) {
    try {
      await albumApi.moveAlbum(album.id, newParentId);
      commit(MutationType.MOVE_DOCUMENT, {document: album, newParentId});
      MessageBus.showSuccess('Album successfully moved.');
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
  async deletePicture({commit}, pictureId: string) {
    try {
      await pictureApi.delete(pictureId);
      commit(MutationType.REMOVE_CHILD, pictureId);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when deleting picture.');
    }
  },
  async movePicture({commit}, {picture, newParentId}) {
    try {
      console.log(picture, newParentId);
      await pictureApi.movePicture(picture.id, newParentId);
      commit(MutationType.MOVE_DOCUMENT, {document: picture, newParentId});
      MessageBus.showSuccess('Picture successfully moved.');
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when moving picture.');
    }
  },
  async fetchAlbumHierarchy({commit}) {
    try {
      const albumHierarchyApi = new AlbumApi('/albumhierarchy');
      const response = await albumHierarchyApi.getAll();

      if (response.data.displayName === '<root>') {
        response.data.displayName = 'Gallery';
      }

      commit(MutationType.SET_ALBUM_HIERARCHY, response.data);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when fetching album hierarchy.');
    }
  },
  async searchPictures({commit}, keyword: string) {
    try {

      const pictureSearchApi = new PictureApi('/search/byname');
      const response = await pictureSearchApi.get(keyword);
      const searchAlbum = new Album({
        id: null,
        displayName: 'results',
        name: 'results',
        type: DocumentType.ALBUM,
        childCount: response.data.length,
        childAlbums: [],
        shareType: ShareType.PUBLIC,
        ownerUserId: '',
        albumTree: [],
        parentAlbumId: null,
        pictures: response.data,
      });
      commit(MutationType.SET_ALBUM, searchAlbum);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when searching pictures.');
    }
  },
  async removeShares({commit}, {userIds, groupIds}) {
    try {
      if (userIds) {
        userIds.forEach(async id => {
          await shareApi.delete(id);
        });
      }
      if (groupIds) {
        groupIds.forEach(async id => {
          await shareApi.delete(id);
        });
      }
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred during sharing document.');
    }
  },
  async shareDocument({commit}, {userIds, groupIds, document}) {
    try {

      let share: Share;
      if (groupIds) {
        groupIds.forEach(async id => {
          share = new Share({
            id: null,
            sharedWithId: id,
            contentType: document.type,
            shareType: DocumentShareType.GROUP,
            contentId: document.id,
          });
          await shareApi.create(share);
        });
      }
      if (userIds) {
        userIds.forEach(async id => {
          share = new Share({
            id: null,
            sharedWithId: id,
            contentType: document.type,
            shareType: DocumentShareType.PERSON,
            contentId: document.id,
          });
          await shareApi.create(share);
        });
      }
      MessageBus.showSuccess('Successfully shared document.');
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred during sharing document.');
    }
  },
  async fetchSharesOfDocument({commit}, document: DocumentBase) {
    try {
      const response = await shareApi.getSharesOfDocument(document);
      const shares = [];
      response.data.forEach(s => {
        shares.push(new Share(s));
      });
      commit(MutationType.SET_SHARES, shares);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when trying to fetch shares.');
    }
  },
  async fetchSharedWithMe({commit}) {
    try {
      const response = await shareApi.sharedWithMe();
      const pictureArrays = [];
      response.data.forEach(pictureArray => {
        const pictures = [];
        pictureArray.forEach(p => {
          pictures.push(new Picture(p));
        });
        pictureArrays.push(pictures);
      });
      commit(MutationType.SET_SHARED_WITH_ME, pictureArrays);
    } catch (err) {
      console.log(err);
      MessageBus.showError('Error occurred when trying to fetch pictures shared with you.');
    }
  },
};

const mutations = {
  [MutationType.SET_ALBUM_HIERARCHY](state: State, albumHierarchy: AlbumHierarchy) {
    state.albumHierarchy = albumHierarchy;
  },
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
  [MutationType.MOVE_DOCUMENT](state: State, {document, newParentId}) {
    mutations[MutationType.REMOVE_CHILD](state, document.id);

    // if document is moved to current album's child
    const child = state.album.childAlbums.find((c => {
      return c.id === newParentId;
    }));
    if (child) {
      child.childCount++;
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
  [MutationType.SET_SHARES](state: State, shares: Share[]) {
    state.shares = shares;
  },
  [MutationType.SET_SHARED_WITH_ME](state: State, sharedWithMe: Picture[][]) {
    state.sharedWidthMe = sharedWithMe;
  },
};

export default {
  state: new State(),
  getters,
  actions,
  mutations,
};
