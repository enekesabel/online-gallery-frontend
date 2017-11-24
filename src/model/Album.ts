import {Document} from './Document';
import {AlbumOptions} from './AlbumOptions';
import {DocumentType} from './DocumentType';
import {DocumentBaseOptions} from './DocumentBaseOptions';
import {DocumentBase} from './DocumentBase';

export class Album extends Document implements AlbumOptions {
  protected _type: DocumentType = DocumentType.ALBUM;
  protected _children: DocumentBase[] = [];

  constructor(options: AlbumOptions) {
    super(options);
    options.children.forEach(document => {
      const documentOption: DocumentBaseOptions = document;
      // documentOption.parent = this;
      this._children.push(new DocumentBase(documentOption));
    });
  }

  get type(): DocumentType {
    return this._type;
  }

  get children(): DocumentBase[] {
    return this._children;
  }
}
