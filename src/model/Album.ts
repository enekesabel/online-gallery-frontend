import {Document} from './Document';

export class Album extends Document {
  private _type: string = 'album';
  private _children: Document[] = [];

  get type(): string {
    return this._type;
  }

  get children(): Document[] {
    return this._children;
  }
}
