import {Document} from './Document';
import {AlbumOptions} from './AlbumOptions';
import {DocumentType} from './DocumentType';
import {DocumentFactory} from './DocumentFactory';

export class Album extends Document implements AlbumOptions {
  private _type: DocumentType = DocumentType.ALBUM;
  private _children: Document[] = [];
  private factory: DocumentFactory = new DocumentFactory();

  constructor(options: AlbumOptions) {
    super(options);
    options.children.forEach(document => {
      this._children.push(this.factory.getDocument(options));
    });
  }

  get type(): DocumentType {
    return this._type;
  }

  get children(): Document[] {
    return this._children;
  }
}
