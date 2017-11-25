import {AbstractApi} from './AbstractApi';
import {DocumentBaseFactory} from '../model/DocumentBaseFactory';
import {DocumentType} from '../model/DocumentType';
import {AlbumBaseOptions} from '../model/AlbumBaseOptions';
import {DocumentBase} from '../model/DocumentBase';
import {PictureOptions} from '../model/PictureOptions';
import {ShareType} from '../model/ShareType';
import {AlbumOptions} from '../model/AlbumOptions';
import {DocumentBaseOptions} from '../model/DocumentBaseOptions';
import {Album} from '../model/Album';

export class DocumentApi extends AbstractApi<DocumentBase> {
  private factory: DocumentBaseFactory = new DocumentBaseFactory();

  constructor() {
    super('/albums');
  }

  createEntity(o: DocumentBaseOptions): DocumentBase {
    return new Album(this.getDummyAlbumOptions());
  }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.createEntity(null));
    });
  }

  get(id: string) {
    return this.getAll();
  }

  getDummyAlbumOptions(): AlbumOptions {
    const owner = {
      id: '1',
      name: 'Me',
      emailAddress: 'asd@emailAddress.com',
    };

    const date = new Date().toDateString();

    const comments = [
      {
        id: '0',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: date,
        userId: owner.id,
        pictureId: '1',
      },
      {
        id: '1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: date,
        userId: owner.id,
        pictureId: '1',
      },
      {
        id: '2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: date,
        userId: owner.id,
        pictureId: '1',
      },
    ];

    const options: AlbumBaseOptions = {
      id: null,
      ownerUserId: owner.id,
      type: DocumentType.ALBUM,
      name: 'My album',
      parentAlbumId: null,
      childNumber: 0,
      displayName: 'myalbum',
      shareType: ShareType.PUBLIC,
    };

    const imageOptions: PictureOptions = {
      id: null,
      name: 'My first image',
      displayName: 'My first image',
      description: 'asdasd',
      comments,
      commentsNumber: comments.length,
      ownerUserId: owner.id,
      parentAlbumId: null,
      createdAt: date,
      type: DocumentType.PICTURE,
      url: 'http://lorempixel.com/1024/800/',
      size: 100,
      width: 1024,
      height: 800,
    };

    const childAlbums = [];
    const pictures = [];
    childAlbums.push(options);
    pictures.push(imageOptions);

    const albumOptions: AlbumOptions =
      Object.assign({
        childAlbums,
        pictures,
      },            options);
    return albumOptions;
  }


}
