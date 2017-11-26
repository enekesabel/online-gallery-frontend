import {AbstractApi} from './AbstractApi';
import {DocumentBase} from '../model/DocumentBase';
import Vue from 'vue';

export class DocumentApi extends AbstractApi<DocumentBase> {
  constructor() {
    super('/albums');
  }

  async update() {
    throw new Error('Not implemented');
  }

  async renameAlbum(albumId: string, newName: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/renamealbum', {
      albumId,
      newName,
    });
  }

  async moveAlbum(albumId: string, newParentId: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/movealbum', {
      albumId,
      newParentId,
    });
  }
}
