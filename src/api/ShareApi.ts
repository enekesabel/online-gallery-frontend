import {AbstractApi} from './AbstractApi';
import Vue from 'vue';
import {Share} from '../model/Share';
import {DocumentBase} from '../model/DocumentBase';

export class ShareApi extends AbstractApi<Share> {
  constructor(url?: string) {
    super(url || '/shares');
  }

  async getSharesOfDocument(document: DocumentBase): Promise<any> {
    return await Vue.axios.get(this.url + '/sharesof/' + document.id);
  }

  async sharedWithMe(): Promise<any> {
    return await Vue.axios.get(this.url + '/sharedwithme');
  }

}
