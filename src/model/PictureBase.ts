import {PictureBaseOptions} from './PictureBaseOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';

export class PictureBase extends DocumentBase implements PictureBaseOptions {
  protected _type: DocumentType = DocumentType.PICTURE;
  private _commentsNumber: number = 0;
  private _thumbnailName: string = '';

  constructor(options: PictureBaseOptions) {
    super(options);
    this._commentsNumber = options.commentsNumber;
  }

  get commentsNumber(): number {
    return this._commentsNumber;
  }

  get thumbnailName(): string {
    return this._thumbnailName;
  }
}
