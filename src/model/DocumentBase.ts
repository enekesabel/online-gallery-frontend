import {DocumentBaseOptions} from './DocumentBaseOptions';
import {DocumentType} from './DocumentType';
import {Serializable} from './Serializable';

export abstract class DocumentBase implements DocumentBaseOptions, Serializable {
  protected _id: string = null;
  protected _name: string = '';
  protected _displayName: string = '';
  protected _ownerUserId: string;
  protected _type: DocumentType;
  protected _parentAlbumId: string;

  constructor(options?: DocumentBaseOptions) {
    this._id = options && options.id || null;
    this._name = options && options.name;
    this._displayName = options && options.displayName;
    this._ownerUserId = options && options.ownerUserId;
    this._parentAlbumId = options && options.parentAlbumId;
    this._type = options && options.type;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get ownerUserId(): string {
    return this._ownerUserId;
  }

  get type(): DocumentType {
    return this._type;
  }

  get displayName(): string {
    return this._displayName;
  }

  get parentAlbumId(): string {
    return this._parentAlbumId;
  }

  toObject(): DocumentBaseOptions {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      displayName: this.displayName,
      parentAlbumId: this.parentAlbumId,
      ownerUserId: this.ownerUserId,
    };
  }

}
