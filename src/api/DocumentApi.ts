import {AbstractApi} from './AbstractApi';
import {DocumentFactory} from '../model/DocumentFactory';
import {DocumentOptions} from '../model/DocumentOptions';
import {Document} from '../model/Document';

export class DocumentApi extends AbstractApi<Document> {
  private factory: DocumentFactory = new DocumentFactory();

  constructor() {
    super('/gallery');
  }

  createEntity(o: DocumentOptions): Document {
    return this.factory.getDocument(o);
  }

}
