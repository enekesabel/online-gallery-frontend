import {PictureBaseOptions} from './PictureBaseOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';

export class PictureBase extends DocumentBase implements PictureBaseOptions {
  protected _type: DocumentType = DocumentType.PICTURE;
  private _commentsNumber: number;
  private _url: string;

  constructor(options: PictureBaseOptions) {
    super(options);
    this._commentsNumber = options.commentsNumber;
    this._url = options.url;
  }

  get commentsNumber(): number {
    return this._commentsNumber;
  }

  get url(): string {
    return this._url;
  }
}
