import {AbstractApi} from './AbstractApi';
import {DocumentBase} from '../model/DocumentBase';
export class DocumentApi extends AbstractApi<DocumentBase> {
  constructor() {
    super('/albums');
  }

}
