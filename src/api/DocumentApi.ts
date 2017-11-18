import {AbstractApi} from './AbstractApi';
import {DocumentFactory} from '../model/DocumentFactory';
import {DocumentOptions} from '../model/DocumentOptions';
import {Document} from '../model/Document';
import {DocumentType} from '../model/DocumentType';
import {AlbumOptions} from '../model/AlbumOptions';

export class DocumentApi extends AbstractApi<Document> {
  private factory: DocumentFactory = new DocumentFactory();

  constructor() {
    super('/gallery');
  }

  createEntity(o: DocumentOptions): Document {
    const options: AlbumOptions = {
      id: null,
      url: '',
      owner: {
        id: 1,
        name: 'Me',
        email: 'asd@email.com',
      },
      type: DocumentType.ALBUM,
      description: 'this is mz first album',
      name: 'My album',
      comments: [],
      children: [],
      parent: null,
      createdAt: new Date().toDateString(),
    };
    return this.factory.getDocument(options);
  }

}
