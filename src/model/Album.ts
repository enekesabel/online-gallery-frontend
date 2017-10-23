import {Document} from './Document';
import {AlbumOptions} from './AlbumOptions';
import {DocumentType} from './DocumentType';
import {DocumentFactory} from './DocumentFactory';
import {DocumentBaseOptions} from './DocumentBaseOptions';
import {DocumentBase} from './DocumentBase';

export class Album extends Document implements AlbumOptions {
  protected _type: DocumentType = DocumentType.ALBUM;
  private _children: DocumentBase[] = [];
  private factory: DocumentFactory = new DocumentFactory();

  constructor(options: AlbumOptions) {
    super(options);
    options.children.forEach(document => {
      const documentOption: DocumentBaseOptions = document;
      documentOption.parent = this;
      document.parent = this;
      this._children.push(this.factory.getDocument(documentOption));
    });
  }

  get type(): DocumentType {
    return this._type;
  }

  get children(): DocumentBase[] {
    return this._children;
  }
}
