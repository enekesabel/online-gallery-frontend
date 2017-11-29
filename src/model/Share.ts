import {ShareContentType, ShareOptions, DocumentShareType} from './ShareOptions';
import {Serializable} from './Serializable';

export class Share implements ShareOptions, Serializable {
  id: string;
  contentType: ShareContentType;
  shareType: DocumentShareType;
  contentId: string;
  sharedWithId: string;


  constructor(options?: ShareOptions) {
    this.contentType = options && options.contentType;
    this.shareType = options && options.shareType;
    this.contentId = options && options.contentId;
    this.sharedWithId = options && options.sharedWithId;
    this.id = options && options.id;
  }

  toObject(): ShareOptions {
    return {
      id: this.id,
      shareType: this.shareType,
      contentType: this.contentType,
      sharedWithId: this.sharedWithId,
      contentId: this.contentId,
    };
  }

}
