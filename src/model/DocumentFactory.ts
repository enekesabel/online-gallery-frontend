import {Document} from './Document';
import {DocumentOptions} from './DocumentOptions';
import {DocumentType} from './DocumentType';
import {Image} from './Image';
import {ImageOptions} from './ImageOptions';
import {Album} from './Album';
import {AlbumOptions} from './AlbumOptions';

export class DocumentFactory {
  getDocument(options: DocumentOptions): Document {
    switch (options.type) {
      case DocumentType.IMAGE:
        return new Image(<ImageOptions>options);
      case DocumentType.ALBUM:
        return new Album(<AlbumOptions>options);
    }
  }
}
