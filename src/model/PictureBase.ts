import {PictureBaseOptions} from './PictureBaseOptions';
import {DocumentType} from './DocumentType';
import {DocumentBase} from './DocumentBase';
import {Serializable} from './Serializable';
import Vue from 'vue';

export class PictureBase extends DocumentBase implements PictureBaseOptions, Serializable {
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

  get imageUrl() {
    return Vue.prototype.staticUrl + '/' + this.name;
  }
  get thumbnailImageUrl() {
    return Vue.prototype.staticUrl + '/' + (this.thumbnailName || this.name);
  }

  toObject(): PictureBaseOptions {
    return Object.assign(super.toObject(), {
      commentsNumber: this.commentsNumber,
      thumbnailName: this.thumbnailName,
    });
  }
}
