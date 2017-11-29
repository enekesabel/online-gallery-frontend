import {HasId} from './HasId';

export type ShareOptions = HasId & {
  contentType: ShareContentType,
  shareType: DocumentShareType,
  contentId: string,
  sharedWithId: string,
};


export enum ShareContentType {
  IMAGE = 'IMAGE',
  PERSON = 'PERSON',
}

export enum DocumentShareType {
  GROUP = 'GROUP',
  PERSON = 'PERSON',
}
