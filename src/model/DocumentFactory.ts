import {DocumentType} from './DocumentType';
import {Image} from './Image';
import {ImageOptions} from './ImageOptions';
import {AlbumOptions} from './AlbumOptions';
import {DocumentBaseOptions} from './DocumentBaseOptions';
import {DocumentBase} from './DocumentBase';

export class DocumentFactory {
  getDocument(options: DocumentBaseOptions): DocumentBase {
    switch (options.type) {
      case DocumentType.IMAGE:
        return new Image(<ImageOptions>options);
      case DocumentType.ALBUM:
        return new DocumentBase(<AlbumOptions>options);
    }
  }
}
