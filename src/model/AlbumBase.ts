import {AlbumBaseOptions} from './AlbumBaseOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';
import {ShareType} from './ShareType';

export class AlbumBase extends DocumentBase implements AlbumBaseOptions {
  protected _type: DocumentType = DocumentType.ALBUM;
  private _shareType: ShareType;
  private _childCount: number = 0;

  constructor(options?: AlbumBaseOptions) {
    super(options);
    this._shareType = options && options.shareType;
    this._childCount = options && options.childCount;
  }

  get shareType(): ShareType {
    return this._shareType;
  }

  get childCount(): number {
    return this._childCount;
  }
}
