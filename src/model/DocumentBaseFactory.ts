import {DocumentType} from './DocumentType';
import {AlbumBaseOptions} from './AlbumBaseOptions';
import {AlbumBase} from './AlbumBase';
import {DocumentBaseOptions} from './DocumentBaseOptions';
import {PictureOptions} from './PictureOptions';
import {Picture} from './Picture';

export class DocumentBaseFactory {
  getDocument(options: DocumentBaseOptions): Picture | AlbumBase {
    if (options)
      switch (options.type) {
        case DocumentType.PICTURE:
          return new Picture(<PictureOptions>options);
        case DocumentType.ALBUM:
          return new AlbumBase(<AlbumBaseOptions>options);
      }
  }
}
