import {AbstractApi} from './AbstractApi';
import {DocumentFactory} from '../model/DocumentFactory';
import {DocumentOptions} from '../model/DocumentOptions';
import {Document} from '../model/Document';
import {DocumentType} from '../model/DocumentType';
import {AlbumOptions} from '../model/AlbumOptions';
import {ImageOptions} from '../model/ImageOptions';

export class DocumentApi extends AbstractApi<Document> {
  private factory: DocumentFactory = new DocumentFactory();

  constructor() {
    super('/gallery');
  }

  createEntity(o: DocumentOptions): Document {

    o = this.getDummyAlbumOptions();
    return this.factory.getDocument(o);
  }

  getDummyAlbumOptions(): AlbumOptions {
    const owner = {
      id: 1,
      name: 'Me',
      email: 'asd@email.com',
    };

    const date = new Date().toDateString();

    const options: AlbumOptions = {
      id: null,
      url: '',
      owner,
      type: DocumentType.ALBUM,
      description: 'this is mz first album',
      name: 'My album',
      comments: [],
      children: [],
      parent: null,
      createdAt: date,
    };

    const imageOptions: ImageOptions = {
      id: null,
      name: 'My first image',
      description: 'asdasd',
      comments: [],
      owner,
      parent: null,
      createdAt: date,
      type: DocumentType.IMAGE,
      url: 'http://lorempixel.com/1024/800/',
      size: 100,
      width: 1024,
      height: 800,
      file: null,
    };

    const children = [];
    children.push(options);
    children.push(imageOptions);

    options.children = children;
    return options;
  }


}
