import {DocumentType} from './DocumentType';
import {PictureBaseOptions} from './PictureBaseOptions';
import {AlbumBaseOptions} from './AlbumBaseOptions';
import {PictureBase} from './PictureBase';
import {AlbumBase} from './AlbumBase';
import {DocumentBaseOptions} from './DocumentBaseOptions';

export class DocumentBaseFactory {
  getDocument(options: DocumentBaseOptions): PictureBase | AlbumBase {
    if (options)
      switch (options.type) {
        case DocumentType.PICTURE:
          return new PictureBase(<PictureBaseOptions>options);
        case DocumentType.ALBUM:
          return new AlbumBase(<AlbumBaseOptions>options);
      }
  }
}
