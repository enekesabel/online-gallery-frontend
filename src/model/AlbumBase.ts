import {AlbumBaseOptions} from './AlbumBaseOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';
import {ShareType} from './ShareType';

export class AlbumBase extends DocumentBase implements AlbumBaseOptions {
  protected _type: DocumentType = DocumentType.ALBUM;
  private _shareType: ShareType;
  private _childNumber: number;

  constructor(options: AlbumBaseOptions) {
    super(options);
    this._shareType = options.shareType;
    this._childNumber = options.childNumber;
  }

  get shareType(): ShareType {
    return this._shareType;
  }

  get childNumber(): number {
    return this._childNumber;
  }
}
