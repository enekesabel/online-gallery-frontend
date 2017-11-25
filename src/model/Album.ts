import {AlbumOptions} from './AlbumOptions';
import {AlbumBase} from './AlbumBase';
import {PictureBase} from './PictureBase';

export class Album extends AlbumBase implements AlbumOptions {

  private _childAlbums: AlbumBase[] = [];
  private _pictures: PictureBase[] = [];

  constructor(options: AlbumOptions) {
    super(options);
    options.childAlbums.forEach(c => {
      this._childAlbums.push(new AlbumBase(c));
    });

    options.pictures.forEach(p => {
      this._pictures.push(new PictureBase(p));
    });
  }

  get childAlbums(): AlbumBase[] {
    return this._childAlbums;
  }

  get pictures(): PictureBase[] {
    return this._pictures;
  }
}
