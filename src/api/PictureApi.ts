import {AbstractApi} from './AbstractApi';
import Vue from 'vue';
import {PictureBase} from '../model/PictureBase';

export class PictureApi extends AbstractApi<PictureBase> {
  constructor(url?: string) {
    super(url || '/pictures');
  }

  async movePicture(pictureId: string, newParentId: string): Promise<any> {
    return await Vue.axios.patch(this.url + '/movepicture', {
      pictureId,
      newParentId,
    });
  }

}
