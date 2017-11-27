import {AbstractApi} from './AbstractApi';
import {DocumentBase} from '../model/DocumentBase';
import Vue from 'vue';

export class DocumentApi extends AbstractApi<DocumentBase> {
  constructor(url?: string) {
    super(url || '/albums');
  }

  async update() {
    throw new Error('Not implemented');
  }

  async renameAlbum(albumId: string, newName: string, newDisplayName: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/renamealbum', {
      albumId,
      newName,
      newDisplayName,
    });
  }

  async moveAlbum(albumId: string, newParentId: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/movealbum', {
      albumId,
      newParentId,
    });
  }

}
