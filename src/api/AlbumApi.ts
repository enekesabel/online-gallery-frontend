import {AbstractApi} from './AbstractApi';
import Vue from 'vue';
import {AlbumBase} from '../model/AlbumBase';

export class AlbumApi extends AbstractApi<AlbumBase> {
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
